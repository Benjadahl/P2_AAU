import { clearConvoList, addConvoToList } from "./UI.js";
import { sendDirectMsg, getPeerJSid } from "./p2p.js";
import { io } from "socket.io-client";

const socket = io();
let thisUser;
let conversations = {};

/*
  Prompt for username on login
*/

login(prompt("Enter username:"));

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
  conversations[data.ID] = data;
  console.log(data);
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

function login (reqUsername) {
  clearConvoList();
  thisUser = reqUsername;
  socket.emit('userLogin', {username: thisUser, peerID: getPeerJSid()});
}

function newConversation (members) {
  socket.emit('newConversation', members);
}