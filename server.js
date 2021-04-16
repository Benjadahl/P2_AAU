import express from 'express';
const app = express();
import { createServer } from "http";
import { Server } from "socket.io";
const http = createServer(app);
const io = new Server(http, {});

let Conversation = {
    members: [],
    chatLog: [],

    sendMessage(msg, socket) {
        let toLog = { msg: msg, timestamp: Date.now() };
        this.members.forEach(member => {
            if (member.socket.id == socket.id) {
                toLog.username = member.username;
            }
        });
        
        this.chatLog.push(toLog);
        this.members.forEach(member => {
            member.socket.emit('peer-msg', toLog);
        });
    }
}
Conversation.members.forEach(username => {
    members.push(users[username]);
    users[username].conversation.push(this);
});
    class User {
        constructor(username, peerID, socket) {
            this.username = username;
            this.peerID = peerID;
            this.socket = socket;
            this.conversation = [];
        }

        setConnection(peerID, socket) {
            this.peerID = peerID;
            this.socket = socket;
        }
    }


    let conversation = [];
    let users = {};

io.on('connection', socket => {
    socket.on('msg', data => {
        console.log('Message: ' + data);
        Conversation.sendMessage(data.msg, socket);
    });

    /* Function is called when a new peer connects */
    socket.on('userLogin', data => {
        //If user is not already defined
        if (users[data.username] == null) {
            users[data.username] = new User(data.username, data.peerID, socket);
        } else {
            users[data.username].setConnection(data.peerID, socket);
        }

        users[data.username].conversation.forEach(conversation => {
            const toSend = {
                // ID: conversation.ID,
                chatLog: conversation.chatLog,
                members: {}
            }

            conversation.members.forEach(member => {
                toSend.members[member.username] = member.peerID;
            });

            socket.emit('Conversation', toSend);
        });

        console.log(users);
    });

    socket.on('Conversation', () => {
        
        conversation.push(conversation);
        console.log(conversation);
    });

});

/* Serve the dist folder via Express */
app.use(express.static('dist'));

io.listen(app.listen(3000));