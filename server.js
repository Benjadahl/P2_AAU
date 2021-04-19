import express from 'express';
const app = express();
import { createServer } from "http";
import { Server } from "socket.io";
const http = createServer(app);
const io = new Server(http, {});

let listOfMembers= [];
let Conversation = {
    members: [],
<<<<<<< Updated upstream
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
=======
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
>>>>>>> Stashed changes
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
        sendMessage(data, socket); //removed .msg
    });
    
    /* Function is called when a new peer connects */
    socket.on('userLogin', data => {
        socket.emit('chatLog',Conversation.chatLog);
        //If user is not already defined
        if (users[data.username] == null) {
            users[data.username] = new User(data.username, data.peerID, socket);
            Conversation.members.push(users[data.username]);//new
            listOfMembers.push(data.username);
        } else {
            users[data.username].setConnection(data.peerID, socket);
        }
<<<<<<< Updated upstream

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

=======
        socket.emit('login', listOfMembers);//emits the usernames so that they can be shown in the interface
    
});
  
>>>>>>> Stashed changes
});


/* Serve the dist folder via Express */
app.use(express.static('dist'));

io.listen(app.listen(3000));
