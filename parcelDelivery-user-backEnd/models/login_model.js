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
const login = {
    checkifUserExists(userName) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM user WHERE user_name = ?`;
            const result = yield dataBase_1.default.promise().query(query, [userName]);
            return result[0];
        });
    },
    getUserPwd(userName) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT password FROM user WHERE user_name = ?`;
            const [result] = yield dataBase_1.default.promise().query(query, [userName]);
            if (Array.isArray(result) && result.length === 0) {
                return ({ error: 'Password has not found' });
            }
            return result;
        });
    },
    getLoginUser(userName, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM user WHERE user_name = ? AND password = ?`;
            const result = yield dataBase_1.default.promise().query(query, [userName, password]);
            return result[0];
        });
    }
};
exports.default = login;
