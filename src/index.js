import { clearConvoList, addConvoToList, clearMembersList, parseUserString, getCurConversation } from "./UI.js";
import { sendDirectMsg, getPeerJSid } from "./p2p.js";
import { io } from "socket.io-client";
import Torben from "../torben/client.js";


const socket = io();
let conversations = {};
let username;

let t = new Torben(socket);
setTimeout(() => {
  console.log(t.id);
}, 3000);

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

socket.on('newConversation', data => {
  conversations[data.ID] = data;
  addConvoToList(conversations[data.ID]);
  console.log(data);
  data.chatLog.forEach(msg => printMsg(msg));
});

function sendFieldValue () {
  sendMsg(document.getElementById("exampleDataList").value, getCurConversation());
  document.getElementById("exampleDataList").value = "";
}

function sendMsg(msg, convoID) {
  socket.emit('msg', { msg: msg, convoID: convoID });
}

function printMsg(data) {
  console.log('Convo: ' + data.ID + ' Sender: ' + data.username + ' Message: ' + data.msg);
  let newtxt = document.createElement("H6");
  let msgRow = document.createElement('div');
  newtxt.innerText = data.msg;
  msgRow.className = "row";
  if (username === data.username) {
    newtxt.className = "text-end";
  }

  document.getElementById("sendt").appendChild(msgRow);
  msgRow.appendChild(newtxt);
}

function login (reqUsername) {
  clearConvoList();
  clearMembersList();
  username = reqUsername;
  socket.emit('userLogin', {username: username, peerID: getPeerJSid()});
}

document.getElementById("loginButton").addEventListener("click", () => {
  login(document.getElementById("username").value);
  document.getElementById("Overlay").remove();
});

document.getElementById("createConvo").addEventListener("click", () => {
  newConversation(parseUserString(document.getElementById("convoMembers").value, username));
  document.getElementById("convoMembers").value = '';
});
 
function newConversation(members) {
  socket.emit('newConversation', members);
}