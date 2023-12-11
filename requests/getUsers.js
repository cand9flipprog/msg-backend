import connection from "../src/database.js";

const getUsers = (req, res) => {
    if(req.body === undefined) return res.json({ error: "No body provided" });

    connection.query("SELECT * FROM users;", (err, rows, fields) => {
        if(err) throw err;

        res.json(rows);
    });
};

export default getUsers;
