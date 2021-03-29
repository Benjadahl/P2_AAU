const socket = io();

document.getElementById("sendMsg").addEventListener("click", () => {
  
    sendMsg(document.getElementById("exampleDataList").value);
    document.getElementById("exampleDataList").value = "";
});

socket.on('peer-msg', data => {
  printMsg(data);
});

socket.on('chatLog', chatLog => {
  chatLog.forEach(msg => {
    printMsg(msg);
  });
});

socket.on('newConversation', data => {
  addConvoToList(data);
  data.chatLog.forEach(msg => printMsg(msg));
});

function sendMsg(msg, convoID) {
  socket.emit('msg', {msg: msg, convoID: convoID});
  printMsg(msg, true);
}

function printMsg(data, me) {
  console.log('Convo: ' + data.ID + ' Sender: ' + data.username + ' Message: ' + data.msg);
  let newtxt = document.createElement("H6");
  newtxt.innerText = data;
 
  
  document.getElementById("sendt").appendChild(newtxt);
}

function login (username) {
  clearConvoList();
  socket.emit('userLogin', {username: username, peerID: peerJS.id});
}

function newConversation (members) {
  socket.emit('newConversation', members);
}