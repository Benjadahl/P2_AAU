import { clearMembersList } from "./UI.js";
import { sendDirectMsg, getPeerJSid } from "./p2p.js";
import { io } from "socket.io-client";

const socket = io();
let conversations = {};
let username;

window.addEventListener("resize", () => {
  resizeAll();
});

function resizeAll() {
  const chatRatio = 0.90;
  const roomRatio = 0.97;

  reSize(chatRatio, "sendt");
  reSize(chatRatio, "members");
  reSize(roomRatio, "chatGroup");
}

function reSize(ratio, id) {
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

// Needs to be changed to having one conversation (only)
socket.on('Conversation', data => {
  conversations[data.ID] = data;
  console.log(data);
  data.chatLog.forEach(msg => printMsg(msg));
});

function sendFieldValue () {
  sendMsg(document.getElementById("exampleDataList").value);
  document.getElementById("exampleDataList").value = "";
}

function sendMsg(msg) {
  socket.emit('msg', { msg: msg });
}

function printMsg(data) {
  console.log(data);
  console.log(' Sender: ' + data.username + ' Message: ' + data.msg);
  let newtxt = document.createElement("H6");
  let msgRow = document.createElement('div');
  newtxt.innerText = data.msg;
  msgRow.className = "row";
  if (username === data.username) {
    newtxt.className = "text-end";
  }

  document.getElementById("sent").appendChild(msgRow);
  msgRow.appendChild(newtxt);
}

// When you login you need to be implemented into the conversation. 
function login (reqUsername) {
  clearMembersList();
  username = reqUsername;
  socket.emit('userLogin', {username: username, peerID: getPeerJSid()});
}

document.getElementById("loginButton").addEventListener("click", () => {
  login(document.getElementById("username").value);
  document.getElementById("Overlay").remove();
  socket.emit('Conversation', members);
});
