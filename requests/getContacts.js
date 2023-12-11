import connection from "../src/database.js";

const getContacts = (req, res) => {
    if(req.body === undefined) return res.json({ error: "No body provided" });

    connection.query("SELECT * FROM contacts;", (err, rows, fields) => {
        if(err) throw err;

        res.json(rows);
    })
};

export default getContacts;
