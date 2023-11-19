import express from 'express';
import login from '../models/login_model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();
const secretkey = process.env.JWT_SECRET as string;

router.post('/login', async (req, res) => {
    const {userName, password} = req.body;
    try {
        
        const user = await login.getUser(userName);
        if (Array.isArray(user) && user.length === 0) {
            return res.status(401).json({ error: 'Username is not exist' });
        }
        const ifMatchPwd = await bcrypt.compare(password, user.password);
        if(!ifMatchPwd){
            return res.status(401).json({ error: 'Password is incorrect' });
        }
        const token = jwt.sign({userName: user.user_name}, secretkey, {expiresIn: '10h'});
        const response = {
            token: token,
            message: "You are logged in",
            sueccess: true
        };
        res.status(200).json(response);
    }catch (error) {
        const response = {
            message: "Login failed",
            sueccess: false
        };
       res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/verify', async (req, res) => {
    const token = req.cookies['token'];
    if(!token) 
    {return res.status(401).send("unauthorized");}
    try{
        const payload = jwt.verify(token, secretkey) as jwtPayload;
        res.status(200).json(payload);
    }catch(error){
        if(error instanceof jwt.TokenExpiredError){
            res.status(401).send("Token expired. Log in again");
        }else if (error instanceof jwt.JsonWebTokenError){
            res.status(401).send("Invalid token. Log in again");}
            else{ 
            res.status(400).send("Bad request");
    }
    }
});

export default router;