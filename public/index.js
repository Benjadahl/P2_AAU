const socket = io();

function sendMsg (data) {
  socket.emit('msg', data);
}

socket.on('peer-msg', data => {
  console.log('Message: ' + data);
});