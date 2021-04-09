import { clearConvoList, addConvoToList, clearMembersList, addMemberToList, makeConversation } from "./UI.js";
import { sendDirectMsg, getPeerJSid } from "./p2p.js";
import { io } from "socket.io-client";

const socket = io();
let buttonID;
let conversations = [];
//let conversations = {};
let username;

/*
  Prompt for username on login
*/

//login(prompt("Enter username:"));

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
  conversations.push(data);
  addConvoToList(data);
  conversations[data.ID] = data;
  console.log(data);
  data.chatLog.forEach(msg => printMsg(msg));
});

function sendFieldValue () {
  sendMsg(document.getElementById("exampleDataList").value, buttonID);
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
  newConversation(makeConversation(document.getElementById("convoMembers").value, username));
  document.getElementById("convoMembers").value = '';
});

/*Extracting the ID from the conversation buttons and adding the correct member to the correct lists*/
document.getElementById("conversationList").addEventListener("click", (e) => {
  if (e.target.tagName == 'BUTTON') {
    buttonID = e.target.id;
    console.log(buttonID);
    for (let i = 0; i < conversations.length; i++) {
      if (buttonID == conversations[i].ID) {
        addMemberToList(conversations[i]);
        break;
      }
    }
  }
});

 
function newConversation(members) {
  socket.emit('newConversation', members);
}