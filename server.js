import express from 'express';
const app = express();
import { createServer } from "http";
import { Server } from "socket.io";
const http = createServer(app);
const io = new Server(http, {});
import torben from "./torben/server.js";

let listOfMembers = {};
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

        for (let member in listOfMembers) {
            const details = listOfMembers[member];

            if (details.username === data.username) {
                if (details.online) {
                    throw 'Duplicate usernames online';
                } else {
                    delete listOfMembers[member];
                }
            }
        }

        listOfMembers[socket.id] = {
            username: data.username,
            online: true
        };

        /*emits the usernames to all users so that they can be shown in the interface*/
        sendMemberList(listOfMembers, io);
    });

    socket.on('logMsg', msg => {
        logMsg(msg);
    });

    socket.on('disconnect', () => {
        if (listOfMembers[socket.id] != null) {
            listOfMembers[socket.id].online = false;
            sendMemberList(listOfMembers, io);
        }
    });
});

/* Strip memberlist object of socket ID's to not 
expose them to the clients */
function sendMemberList(memberList, io) {
    let toSend = [];

    for (let member in memberList) {
        toSend.push(memberList[member]);
    }

    io.sockets.emit('login', toSend);
}

/* Serve the dist folder via Express */
app.use(express.static('dist'));
io.listen(app.listen(3000, '0.0.0.0'));