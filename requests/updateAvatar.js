import connection from "../src/database.js";

const updateAvatar = (req, res) => {
    if (req.body === undefined) return res.json({ error: "No body provided" });
    if (req.body.avatar === null) return res.json({ error: "No url provided" });

    console.log(req.body);

    connection.query(`UPDATE users SET avatar = "${req.body.avatarUrl}" WHERE id_user = ${req.body.userId}`, [req.body.avatarUrl, req.body.userId], (err, rows, fields) => {
        if (err) throw err;

        return res.status(200).json({ success: "Successfully updated", data: rows });
    });
};

export default updateAvatar;
