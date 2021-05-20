import express from 'express';
const app = express();
import { createServer } from "http";
import { Server } from "socket.io";
const http = createServer(app);
const io = new Server(http, {});
import torben from "./torben/server.js";

let listOfMembers = [];
let chatLog = [];

function logMsg(msg) {
    let toLog = { msg: msg, timestamp: Date.now() };
    chatLog.push(toLog);
}

torben(io);

io.on('connection', socket => {
    /* Function is called when a new peer connects */
    socket.on('userLogin', data => {
        socket.emit('chatLog', chatLog);
        //If username is not already taken
        if (!listOfMembers.includes(data.username)) {
            listOfMembers.push(data.username);
        }
        /*emits the usernames to all users so that they can be shown in the interface*/
        io.sockets.emit('login', listOfMembers);
    });

    socket.on('logMsg', msg => {
        logMsg(msg);
    });
});

/* Serve the dist folder via Express */
app.use(express.static('dist'));
io.listen(app.listen(3000, '0.0.0.0'));