"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_model_1 = __importDefault(require("../models/login_model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
const secretkey = process.env.JWT_SECRET;
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, password } = req.body;
    try {
        const user = yield login_model_1.default.getUser(userName);
        if (Array.isArray(user) && user.length === 0) {
            return res.status(401).json({ error: 'Username is not exist' });
        }
        const ifMatchPwd = yield bcrypt_1.default.compare(password, user.password);
        if (!ifMatchPwd) {
            return res.status(401).json({ error: 'Password is incorrect' });
        }
        const token = jsonwebtoken_1.default.sign({ userName: user.user_name }, secretkey, { expiresIn: '10h' });
        const response = {
            token: token,
            message: "You are logged in",
            sueccess: true
        };
        res.status(200).json(response);
    }
    catch (error) {
        const response = {
            message: "Login failed",
            sueccess: false
        };
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
router.get('/verify', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies['token'];
    if (!token) {
        return res.status(401).send("unauthorized");
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, secretkey);
        res.status(200).json(payload);
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            res.status(401).send("Token expired. Log in again");
        }
        else if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            res.status(401).send("Invalid token. Log in again");
        }
        else {
            res.status(400).send("Bad request");
        }
    }
}));
exports.default = router;
