import connection from "../src/database.js";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
    if (req.body === undefined) return res.json({ error: "No body provided" });
    if (req.body.name.length < 3) return res.status(409).json({ error: "Name length should be >= 3" });
    if (req.body.surname.length < 2) return res.status(409).json({ error: "Surname length should be >= 2" });
    if (req.body.email.length < 12) return res.status(409).json({ error: "Email length should be >= 12" });
    if (req.body.password < 5) return res.status(409).json({ error: "Password length should be <= 5" });

    const regDate = new Date();
    const avatar = "https://cdn-icons-png.flaticon.com/512/6596/6596121.png";

    connection.query(`SELECT * FROM users WHERE email = ?;`, [req.body.email], (err, rows, fields) => {
        if (err) throw err;

        if (rows.length > 0) {
            return res.status(409).json({ error: "This email already exists!" });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
                if (err) throw err;

                connection.query(
                    "INSERT INTO users(name, surname, email, password, avatar, reg_date) VALUES (?, ?, ?, ?, ?, ?)",
                    [req.body.name, req.body.surname, req.body.email, hashedPassword, avatar, regDate],
                    (err, rows, fields) => {
                        if (err) throw err;
                        res.json({ success: "Successfully registered!" });
                    }
                );
            });
        }
    });
};

export default registerUser;
