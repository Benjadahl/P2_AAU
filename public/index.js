const socket = io();
let buttonID;
let thisUser;
window.addEventListener("resize", () => {
  resizeAll();
});

function resizeAll () {
  const chatRatio = 0.90;
  const roomRatio = 0.97;

  reSize(chatRatio, "sendt");
  reSize(chatRatio, "members");
  reSize(roomRatio, "chatGroup");  
}


function reSize (ratio, id) {
  let height = window.innerHeight * ratio;
  document.getElementById(id).style.setProperty("max-height", height.toString() + "px;"); 
}

document.getElementById("sendMsg").addEventListener("click", () => {
  sendMsg(document.getElementById("exampleDataList").value, buttonID);
  document.getElementById("exampleDataList").value = "";
});

/*Extracting the ID from the conversation buttons*/
document.getElementById("conversationList").addEventListener("click", (e) => {
  if (e.target.tagName == 'BUTTON') {
    buttonID=e.target.id;
    console.log(buttonID)
  }
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
}

function printMsg(data) {
  console.log('Convo: ' + data.ID + ' Sender: ' + data.username + ' Message: ' + data.msg);
  let newtxt = document.createElement("H6");
  let msgRow = document.createElement('div');
  newtxt.innerText = data.msg;
  msgRow.className = "row" ;
  if(thisUser === data.username){
    newtxt.className = "text-end";
  }
  
  document.getElementById("sendt").appendChild(msgRow);   
  msgRow.appendChild(newtxt);
}

function login (username) {
  clearConvoList();
  thisUser = username;
  socket.emit('userLogin', {username: username, peerID: peerJS.id});
}

function newConversation (members) {
  socket.emit('newConversation', members);
}