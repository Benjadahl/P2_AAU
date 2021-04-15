import express from 'express';
const app = express();
import { createServer } from "http";
import { Server } from "socket.io";
const http = createServer(app);
const io = new Server(http, {});
import torben from "./torben/server.js";

class Conversation {
  constructor (ID, members) {
    this.ID = ID;
    this.members = [];
    this.chatLog = [];
    members.forEach(username => {
      this.members.push(users[username]);
      users[username].conversations.push(this);
    });
  }

  sendMessage (msg, socket) {
    let toLog = {msg: msg, timestamp: Date.now()};

    this.members.forEach(member => {
      if (member.socket.id == socket.id) {
        toLog.username = member.username;
      }
    });

    this.chatLog.push(toLog);
    toLog.ID = this.ID;

    this.members.forEach(member => {
      member.socket.emit('peer-msg', toLog);
    });
  }
}

class User {
  constructor (username, peerID, socket) {
    this.username = username;
    this.peerID = peerID;
    this.socket = socket;
    this.conversations = [];
  }

  setConnection (peerID, socket) {
    this.peerID = peerID;
    this.socket = socket;
  }
}

let conversations = [];
let users = {};

torben(io);

io.on('connection', socket => {
  socket.on('msg', data => {
    console.log('Message: ' + data);
    conversations[data.convoID].sendMessage(data.msg, socket);
  });
  
  /* Function is called when a new peer connects */
  socket.on('userLogin', data => {
    //If user is not already defined
    if (users[data.username] == null) {
      users[data.username] = new User(data.username, data.peerID, socket);
    } else {
      users[data.username].setConnection(data.peerID, socket);
    }

    users[data.username].conversations.forEach(conversation => {
      const toSend = {
        ID: conversation.ID,
        chatLog: conversation.chatLog,
        members: {}
      }

      conversation.members.forEach(member => {
        toSend.members[member.username] = member.peerID;
      });

      socket.emit('newConversation', toSend);
    });

    console.log(users);
  });

  socket.on('newConversation', members => {
    let conversation = new Conversation(conversations.length, members);
    conversations.push(conversation);
    console.log(conversations);
  });

});

/* Serve the dist folder via Express */
app.use(express.static('dist'));

io.listen(app.listen(3000, '0.0.0.0'));