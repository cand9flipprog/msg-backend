import connection from "../src/database.js";

const createChat = (req, res) => {
    if (req.body === undefined) return res.json({ error: "No body provided" });

    const createdDate = new Date();

    connection.query(`SELECT * FROM chats WHERE (current_user_id = ${req.body.current_id} AND target_user_id = ${req.body.target_id}) OR (current_user_id = ${req.body.target_id} AND target_user_id = ${req.body.current_id})`, (err, rows, fields) => {
        if (err) throw err;

        if (rows.length > 0) {
            return res.status(400).json({ error: "Chat already exists" });
        } else {
            connection.query("INSERT INTO chats(chat_name, created_date, current_user_id, target_user_id) VALUES(?, ?, ?, ?)", [req.body.chat_name, createdDate, req.body.current_id, req.body.target_id], (chatErr, chatRows, chatFields) => {
                if (chatErr) throw chatErr;

                res.json({ success: "Successfully create chat", data: chatRows });
            })
        }
    })

};

export default createChat;
