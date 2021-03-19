const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

var p2p = require('socket.io-p2p-server').Server;
io.use(p2p);

io.on('connection', function (socket) {
  socket.on('peer-msg', function (data) {
    console.log('Message from peer: %s', data)
    socket.broadcast.emit('peer-msg', data)
  });

  socket.on('peer-file', function (data) {
    console.log('File from peer: %s', data)
    socket.broadcast.emit('peer-file', data)
  });

  socket.on('go-private', function (data) {
    socket.broadcast.emit('go-private', data)
  });
});

app.use(express.static('public'));

/*app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client/index.html');
});*/
 
io.listen(app.listen(3000));