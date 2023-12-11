import connection from "../src/database.js";

const addContact = (req, res) => {
    if (req.body === undefined) return res.json({ error: "No body provided" });
    if(req.body.currentUserId === null || req.body.targetUserId === null) return res.json({ error: "No values provided" });

    console.log(req.body);

    const currentUserId = req.body.currentUserId;
    const targetUserId = req.body.targetUserId;

    connection.query(`SELECT * FROM contacts WHERE first_user = ${currentUserId} AND second_user = ${targetUserId} OR first_user = ${targetUserId}`,
        (err, rows, fields) => {
            if (err) throw err;

            if (rows.length > 0) {
                return res.status(400).json({ error: "Contact already exists" });
            };

            connection.query("INSERT INTO contacts VALUES (?, ?);", [currentUserId, targetUserId], (insertErr, insertRows, insertFields) => {
                    if (insertErr) throw insertErr;

                    return res.status(200).json({ success: "Successfully added friend", data: insertRows });
                }
            );
        }
    );
};

export default addContact;

