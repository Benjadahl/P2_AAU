const socket = io();

function sendMsg (data) {
  socket.emit('msg', data);
}

function printMsg (data) {
  console.log('Message: ' + data);
}

socket.on('peer-msg', data => {
  printMsg(data);
});

socket.on('chatLog', chatLog => {
  chatLog.forEach(msg => {
    printMsg(msg);
  });
});