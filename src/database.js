import mysql from "mysql";
import "dotenv/config";

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect();

connection.query("CREATE TABLE IF NOT EXISTS users(id_user INT PRIMARY KEY AUTO_INCREMENT, user_name VARCHAR(255) NOT NULL, user_surname VARCHAR(255) NOT NULL, user_password VARCHAR(255) NOT NULL, user_email VARCHAR(255) NOT NULL UNIQUE, user_avatar VARCHAR(255) NOT NULL, registration_date DATE NOT NULL)" , (err) => {
    if (err) throw err;
    console.log("Successfully connected to database");
});

export default connection;
