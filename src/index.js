import { clearConvoList, addConvoToList } from "./UI.js";
import { sendDirectMsg, getPeerJSid } from "./p2p.js";
import { io } from "socket.io-client";
import testFunction from "../torben/client.js";
testFunction();

const socket = io();
let conversations = {};
let username;

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

/* Bind send message to enter key in input */
document.getElementById("exampleDataList").addEventListener("keydown", e => {
  if (e.code === "Enter") {
    sendFieldValue();
    e.preventDefault();
  }
});

/* Bind send message to send button */
document.getElementById("sendMsg").addEventListener("click", () => {
  sendFieldValue();
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
  conversations[data.ID] = data;
  console.log(data);
  data.chatLog.forEach(msg => printMsg(msg));
});

function sendFieldValue () {
  sendMsg(document.getElementById("exampleDataList").value);
  document.getElementById("exampleDataList").value = "";
}

function sendMsg(msg, convoID) {
  socket.emit('msg', {msg: msg, convoID: convoID});
  printMsg(msg, true);
}

function printMsg(data, me) {
  console.log('Convo: ' + data.ID + ' Sender: ' + data.username + ' Message: ' + data.msg);
  let newtxt = document.createElement("H6");
  let msgRow = document.createElement('div');
  newtxt.innerText = data;
  msgRow.className = "row" ;
  if(me === true){
    newtxt.className = "text-end";
  }
  
  document.getElementById("sendt").appendChild(msgRow);   
  msgRow.appendChild(newtxt);
}

function login (reqUsername) {
  clearConvoList();
  username = reqUsername;
  socket.emit('userLogin', {username: username, peerID: getPeerJSid()});
}

function newConversation (members) {
  socket.emit('newConversation', members);
}