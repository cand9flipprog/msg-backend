import connection from "../src/database.js";

const updateEmail = (req, res) => {
    if (req.body === undefined) return res.json({ error: "No body provided" });

    console.log(req.body);

    connection.query("SELECT * FROM users WHERE email = ?", [req.body.email], (err, rows, fields) => {
        if (err) throw err;

        if (rows.length > 0) {
            return res.status(409).json({ error: "Email already exists" });
        } else {
            connection.query("SELECT * FROM users WHERE id_user = ?", [req.body.userId], (err, rows, fields) => {
                if (err) throw err;

                if (rows.length === 0) {
                    return res.status(404).json({ error: "User not found" });
                }

                connection.query("UPDATE users SET email = ? WHERE id_user = ?", [req.body.email, req.body.userId], (err, rows, fields) => {
                    if (err) throw err;
                    console.log(rows);
                    res.status(200).json({ success: "Successfully update email ", rows });
                });
            });
        }
    });
};

export default updateEmail;
