import connection from "../dataBase";

const login = {

async checkifUserExists(userName: string){
    const query = `SELECT * FROM user WHERE user_name = ?`;	
    const result = await connection.promise(.query(query, [userName]);
    return result[0];
},

async getUserPwd(userName: any) {
    const query = `SELECT password FROM user WHERE user_name = ?`;
    const [result] = await connection.promise().query(query, [userName]);
    if (Array.isArray(result) && result.length === 0) {
        return ({ error: 'Password has not found' });
    }
    return result;
},

async getLoginUser(userName: string, password: string) {
    const query = `SELECT * FROM user WHERE user_name = ? AND password = ?`;
    const result = await connection.promise().query(query, [userName, password]);
    return result[0];
} 
};

export default login;