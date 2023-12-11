import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import http from "http";
import { Server } from "socket.io";
import getUsers from "../requests/getUsers.js";
import registerUser from "../requests/registerUser.js";
import authUser from "../requests/authUser.js";
import getUserInfo from "../requests/getUserInfo.js";
import updateEmail from "../requests/updateEmail.js";
import updateUserInfo from "../requests/updateUserInfo.js";
import updateAvatar from "../requests/updateAvatar.js";
import addContact from "../requests/addContact.js";
import getContacts from "../requests/getContacts.js";
import createChat from "../requests/createChat.js";
import getChats from "../requests/getChats.js";
import getMessages from "../requests/getMessages.js";
import connection from "./database.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://192.168.242.67:8080",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
        transports: ['websocket'],
        upgrade: false
    }
});

app.use(cors({
    credentials: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/api/users", getUsers);
app.get("/api/contacts", getContacts);

app.post("/api/users/register", registerUser);
app.post("/api/users/login", authUser);
app.post("/api/users/add_contact", addContact);
app.post("/api/create_chat", createChat);

app.get("/api/users/get_user_info", getUserInfo);
app.get("/api/users/chats", getChats);
app.get("/api/messages", getMessages);

app.patch("/api/users/update_email", updateEmail);
app.patch("/api/users/update_user_info", updateUserInfo);
app.patch("/api/users/update_avatar", updateAvatar);


io.on("connection", (socket) => {
    const chatName = socket.handshake.query.chat_id;

    socket.join(chatName);

    socket.on("chat message", async (msg) => {
        if(msg.message.length > 255) return socket.emit("error", "Message length should be >= 255");

        const insertQuery = "INSERT INTO messages (chat_id, user_id, message, message_date) VALUES (?, ?, ?, NOW())";
        connection.query(insertQuery, [msg.chat_id, msg.user_id, msg.message], (error, results, fields) => {
            if (error) throw error;
            console.log(`Message saved with ID: ${results.insertId}`);
        });

        io.to(chatName).emit("chat message", msg);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

const port = 8000;

server.listen(port, '192.168.242.67', (err) => {
    if (err) throw err;
    console.log(`Server listening on port ${port}`);
});
