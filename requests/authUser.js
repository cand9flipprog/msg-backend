import connection from "../src/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const authUser = async (req, res) => {
    if (req.body === undefined) return res.status(400).json({ error: "No body provided!" });

    console.log(req.body);

    const email = req.body.email;
    const password = req.body.password;

    const query = "SELECT id_user, email, password FROM users WHERE email = ?;";

    connection.query(query, [email], async (err, result) => {
        if (err) {
            return res.status(500).json({ error: "An error occurred while authenticating" });
        }

        if (result.length === 1) {
            const storedPassword = result[0].password;
            const idUser = result[0].id_user;

            const statusPassword = await bcrypt.compare(password, storedPassword);
            if (statusPassword) {
                const token = jwt.sign({ id_user: idUser }, process.env.JWT_TOKEN, { expiresIn: "7d" });

                return res.status(200).json({ success: "Authentication successful", token });
            } else {
                return res.status(401).json({ error: "Invalid credentials", status: false });
            }
        } else {
            return res.status(401).json({ error: "Authentication failed", status: false });
        }
    });
};


export default authUser;
