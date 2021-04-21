import express from 'express';
const app = express();
import { createServer } from "http";
import { Server } from "socket.io";
const http = createServer(app);
const io = new Server(http, {});

let listOfMembers = [];
let Conversation = {
    members: [],
    chatLog: []
};

function sendMessage(msg, socket) {
    let toLog = { msg: msg, timestamp: Date.now() };
    Conversation.members.forEach(member => {
        if (member.socket.id == socket.id) {
            toLog.username = member.username;
        }
    });

    Conversation.chatLog.push(toLog);
    Conversation.members.forEach(member => {
        member.socket.emit('peer-msg', toLog);
    });
}

class User {
    constructor(username, peerID, socket) {
        this.username = username;
        this.peerID = peerID;
        this.socket = socket;
    }

    setConnection(peerID, socket) {
        this.peerID = peerID;
        this.socket = socket;
    }
}

let users = {};

io.on('connection', socket => {
    socket.on('msg', data => {
        console.log('Message: ' + data);
        sendMessage(data, socket);
    });

    /* Function is called when a new peer connects */
    socket.on('userLogin', data => {
        socket.emit('chatLog', Conversation.chatLog);
        //If user is not already defined
        if (users[data.username] == null) {
            users[data.username] = new User(data.username, data.peerID, socket);
            Conversation.members.push(users[data.username]);//new
            listOfMembers.push(data.username);

        } else {
            users[data.username].setConnection(data.peerID, socket);
        }
        /*emits the usernames to all users so that they can be shown in the interface*/
        Conversation.members.forEach(member => {
            member.socket.emit('login', listOfMembers);
        })
    });
});

/* Serve the dist folder via Express */
app.use(express.static('dist'));

io.listen(app.listen(3000));
