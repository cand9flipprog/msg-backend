import connection from "../src/database.js";

const updateUserInfo = (req, res) => {
    if (req.body === undefined) return res.json({ error: "No body provided" });
    console.log(req.body);
    if(req.body.name === null || req.body.surname === null) return res.json({ error: "No values provided" });
    if(req.body.surname.length < 2) return res.status(409).json({ error: "Check length" });

    connection.query(`UPDATE users SET name = '${req.body.name}', surname = '${req.body.surname}' WHERE id_user = ${req.body.userId};`, [req.body.name, req.body.username, req.body.userId], (err, rows, fields) => {
        if (err) throw err;

        return res.status(200).json({ success: "Successfully updated", data: rows });
    });
};

export default updateUserInfo;
