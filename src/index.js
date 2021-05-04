import { updatesMemberList, resizer } from "./UI.js";
import { sendDirectMsg, getPeerJSid } from "./p2p.js";
import { io } from "socket.io-client";
import Torben from "../torben/client.js";


const socket = io();
let username;

let t = new Torben(socket);
setTimeout(() => {
  console.log(t.id);
}, 3000);

resizer();

window.addEventListener("resize", () => {
  resizer();
});

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

//i probably destroyed this, and the rest of the peer stuff
socket.on('peer-msg', data => {
  printMsg(data);
  data.chatLog.forEach(msg => printMsg(msg));
});

function sendFieldValue() {
  if (document.getElementById("exampleDataList").value != "") {
    sendMsg(document.getElementById("exampleDataList").value);
    document.getElementById("exampleDataList").value = "";
  }
}

function sendMsg(msg) {
  socket.emit('msg', msg);
}

function printMsg(data) {
  console.log(' Sender: ' + data.username + ' Message: ' + data.msg);
  let newtxt = document.createElement("H6");
  let msgRow = document.createElement('div');
  newtxt.innerText = (data.username + ': ' + data.msg);
  msgRow.className = "row";
  if (username === data.username) {
    newtxt.innerText = data.msg;
    newtxt.className = "text-end";
  }
  document.getElementById("sendt").appendChild(msgRow);
  msgRow.appendChild(newtxt);
  /*makes the scroll bar go the the bottom, to show the new messages*/
  document.getElementById('sendt').scrollTop += 28;
  document.getElementById('sendt').scrollTop = document.getElementById('sendt').scrollHeight;
}

function login(reqUsername) {
  username = reqUsername;
  socket.emit('userLogin', { username: username, peerID: getPeerJSid() });
  socket.on('chatLog', chatLog => {
    chatLog.forEach(msg => {
      printMsg(msg);
    });
  });
  document.getElementById("sendt").style.setProperty("max-height", (window.heigth * 0.885).toString() + "px");
}

document.getElementById("loginButton").addEventListener("click", () => {
  login(document.getElementById("username").value);
  document.getElementById("Overlay").remove();
});

/*Updates the memberlist everytime a new person connects*/
socket.on('login', listOfMembers => {
  updatesMemberList(listOfMembers);
});