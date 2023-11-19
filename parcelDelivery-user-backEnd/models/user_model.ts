import connection from "../dataBase";

interface User {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    streetAddress: string;
    postalCode: string;
    city: string;
    userName: string;
    password: string;
}

const user = {
    async createUser(userData: User) {
        console.log(userData);
        const query = `INSERT INTO user (
            user_name, password, first_name, last_name, telephone, 
            email, street_address, postal_code, city
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const result = await connection.promise().query(query, [
            userData.userName, userData.password, userData.firstName, userData.lastName, 
            userData.phone, userData.email, userData.streetAddress, userData.postalCode, userData.city
        ]);

        return result[0];
    },

    async getUser(userId: number) {
        const query = `SELECT * FROM user WHERE id_user = ?`;
        const [result] = await connection.promise().query(query, [userId]);
        return result;
    },

    async deleteUser(userId: number) {
        const query = `DELETE FROM user WHERE id_user = ?`;
        const [result] = await connection.promise().query(query, [userId]);
        return result;
    },
    async deleteUserbyName(user_name: string) {
        const query = `DELETE FROM user WHERE user_name = ?`;
        const [result] = await connection.promise().query(query, [user_name]);
        return result;
    },

    async checkUserExists(userName: string) {
        const query = `SELECT * FROM user WHERE user_name = ?`;
        const [result] = await connection.promise().query(query, [userName]);
        return {message: "Username already exists"};
    }
};

export default user;
