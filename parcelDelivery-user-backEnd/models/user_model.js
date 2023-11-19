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
const dataBase_1 = __importDefault(require("../dataBase"));
const user = {
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(userData);
            const query = `INSERT INTO user (
            user_name, password, first_name, last_name, telephone, 
            email, street_address, postal_code, city
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            const result = yield dataBase_1.default.promise().query(query, [
                userData.userName, userData.password, userData.firstName, userData.lastName,
                userData.phone, userData.email, userData.streetAddress, userData.postalCode, userData.city
            ]);
            return result[0];
        });
    },
    getUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM user WHERE id_user = ?`;
            const [result] = yield dataBase_1.default.promise().query(query, [userId]);
            return result;
        });
    },
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `DELETE FROM user WHERE id_user = ?`;
            const [result] = yield dataBase_1.default.promise().query(query, [userId]);
            return result;
        });
    },
    deleteUserbyName(user_name) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `DELETE FROM user WHERE user_name = ?`;
            const [result] = yield dataBase_1.default.promise().query(query, [user_name]);
            return result;
        });
    },
    checkUserExists(userName) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM user WHERE user_name = ?`;
            const [result] = yield dataBase_1.default.promise().query(query, [userName]);
            return { message: "Username already exists" };
        });
    }
};
exports.default = user;
