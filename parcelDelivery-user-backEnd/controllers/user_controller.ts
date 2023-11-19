import express, { Request, Response } from 'express';
import user from '../models/user_model';
import bcrypt  from 'bcrypt';
//import connection from '../dataBase';

const router = express.Router();

/* interface User {
  id_user: number;
  // Add other properties of the user if applicable
} */

//write to user table
/*`my database user table contains the following columns:
id_user` INT NOT NULL AUTO_INCREMENT,
`user_name` VARCHAR(45) NOT NULL,
`password` VARCHAR(45) NOT NULL,
`first_name` VARCHAR(45) NOT NULL,
`last_name` VARCHAR(45) NOT NULL,
`telephone` VARCHAR(45) NOT NULL,
`email` VARCHAR(45) NOT NULL,
`street_address` VARCHAR(45) NOT NULL,
`postal_code` CHAR(5) NOT NULL,
`city` VARCHAR(45) NOT NULL,
PRIMARY KEY (`id_user`)*/
/**Front end input column  
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  streetAddress: string;
  postalCode: string;
  city: string;
  userName: string;
  password: string;
  confirmPassword: string;
*/

router.post('/user', async (req: Request, res: Response) => {
    try{
        const { firstName, lastName, email, phone, streetAddress, postalCode, city, userName, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Confirm password must be same as password" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        if(await user.checkUserExists(userName)){
            return res.status(409).json({message: "Username already exists, please login or choose new username"});
        }
        await user.createUser({
            userName, password: hashedPassword, firstName, lastName, phone, email, streetAddress, postalCode, city
        });
        return res.status(201).json({ message: "You are registered" });
    }catch(error: any){
        console.error(error.message);
        return res.status(500).json({ message: "Internal Server Error" + error.message});
    }
});
// Get user by id
router.get('/:userId', async (req, res) => {
    const userId = parseInt(req.params.userId, 10); // Extract the user ID from the URL parameter
  
    try {
      const userData = await user.getUser(userId);
  
      if (Array.isArray(userData) && userData.length === 0) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.json(userData);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // delete user by id
  router.delete('/:userId', async (req, res) => {
    const userId = parseInt(req.params.userId, 10); // Extract the user ID from the URL parameter
  
    try {
      const userData = await user.deleteUser(userId);
  
      if (Array.isArray(userData) && userData.length === 0) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.json(userData);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});
    router.delete('/delete/:userName', async (req, res) => {
        const {userName} = req.params; // Extract the user ID from the URL parameter
      
        try {
            if(await user.checkUserExists(userName)){
                await user.deleteUserbyName(userName);
            res.status(200).json({ message: "User deleted" });
            }else{
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error:any) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
  
  export default router;
  

        /* const newUser = {
            user_name: userName,
            password: password,
            first_name: firstName,
            last_name: lastName,
            telephone: phone,
            email: email,
            street_address: streetAddress,
            postal_code: postalCode,
            city: city
        }; */
/*         const [rows] await.promise().query('INSERT INTO user SET ?', newUser);
        return res.status(201).json({ message: "You are registered", userID(rows: any) insert id }); }); 
    }catch(e){
        console.error(e.message);
        return `Error from user model: ${e.message}`;
    } */
    //const user = req.body;
    //console.log(user);
    //const [rows, fileds] = await connection.promise().query('INSERT INTO user SET ?', user);
    



