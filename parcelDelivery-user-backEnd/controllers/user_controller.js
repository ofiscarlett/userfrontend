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
const user_model_1 = __importDefault(require("../models/user_model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
//import connection from '../dataBase';
const router = express_1.default.Router();
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
router.post('/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, phone, streetAddress, postalCode, city, userName, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Confirm password must be same as password" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        if (yield user_model_1.default.checkUserExists(userName)) {
            return res.status(409).json({ message: "Username already exists, please login or choose new username" });
        }
        yield user_model_1.default.createUser({
            userName, password: hashedPassword, firstName, lastName, phone, email, streetAddress, postalCode, city
        });
        return res.status(201).json({ message: "You are registered" });
    }
    catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Internal Server Error" + error.message });
    }
}));
// Get user by id
router.get('/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.userId, 10); // Extract the user ID from the URL parameter
    try {
        const userData = yield user_model_1.default.getUser(userId);
        if (Array.isArray(userData) && userData.length === 0) {
            res.status(404).json({ error: 'User not found' });
        }
        else {
            res.json(userData);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// delete user by id
router.delete('/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.userId, 10); // Extract the user ID from the URL parameter
    try {
        const userData = yield user_model_1.default.deleteUser(userId);
        if (Array.isArray(userData) && userData.length === 0) {
            res.status(404).json({ error: 'User not found' });
        }
        else {
            res.json(userData);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
router.delete('/delete/:userName', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName } = req.params; // Extract the user ID from the URL parameter
    try {
        if (yield user_model_1.default.checkUserExists(userName)) {
            yield user_model_1.default.deleteUserbyName(userName);
            res.status(200).json({ message: "User deleted" });
        }
        else {
            res.status(404).json({ error: 'User not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
exports.default = router;
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
