import connection from "../src/database.js";

const getMessages = (req, res) => {
    if(req.body === undefined) return res.json({ error: "No body provided "} );

    connection.query("SELECT * FROM messages", (err, rows, fields) => {
        if(err) throw err;

        return res.json(rows);
    })
};

export default getMessages;
