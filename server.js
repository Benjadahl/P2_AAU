const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

let chatLog = new Array();

io.on('connection', socket => {
  socket.on('msg', data => {
    console.log('Message: ' + data);
    chatLog.push(data);
    socket.broadcast.emit('peer-msg', data);
  });

  socket.emit('chatLog', chatLog);
});

app.use(express.static('public'));

io.listen(app.listen(3000));