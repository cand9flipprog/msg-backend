import connection from "../src/database.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const getUserInfo = async (req, res) => {
    if (req.body === undefined) return res.json({ error: "No body provided" });

    const getToken = req.headers['x-authorization'];

    const [bearer, token] = getToken.split(' ');

    const verifyToken = jwt.verify(token, process.env.JWT_TOKEN);

    const userId = verifyToken.id_user;

    connection.query(`SELECT id_user, name, surname, email, avatar FROM users WHERE id_user = ${userId};`, (err, rows, fields) => {
        if (err) throw err;
        res.json(rows[0]);
    });

    return res;
};

export default getUserInfo;
