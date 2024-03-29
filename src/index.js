import { updatesMemberList, resizer } from "./UI.js";
import { io } from "socket.io-client";
import Torben from "../torben/client.js";

const socket = io();
let username;

let t = new Torben(socket);

t.addEventListener("recieveMsg", data => {
  printMsg(data);
});

let torbenLogin = new Promise ((resolve, reject) => {
  t.addEventListener("login", () => {
    resolve();
  });
});

resizer();

window.addEventListener("resize", () => {
  resizer();
});

/* Bind send message to enter key in input */
document.getElementById("inputField").addEventListener("keydown", e => {
  if (e.code === "Enter") {
    sendFieldValue();
    e.preventDefault();
  }
});

/* Bind send message to send button */
document.getElementById("sendMsg").addEventListener("click", () => {
  sendFieldValue();
});

function sendFieldValue() {
  if (document.getElementById("inputField").value != "") {
    sendMsg(document.getElementById("inputField").value);
    document.getElementById("inputField").value = "";
  }
}

function sendMsg(msg) {
  const data = {
    msg: msg,
    username: username
  };

  t.sendMessage(data, "all");
  printMsg(data, true);
  socket.emit('logMsg', data);
}

function printMsg(data) {
  let newtxt = document.createElement("H6");
  let msgRow = document.createElement('div');
  newtxt.innerText = (data.username + ': ' + data.msg);
  msgRow.className = "row text-justify";
  if (data.username === username) {
    newtxt.innerText = data.msg;
    newtxt.className = "text-end";
  }
  document.getElementById("sendt").appendChild(msgRow);
  msgRow.appendChild(newtxt);
  /* Makes the scroll bar go the the bottom, to show the new messages*/
  document.getElementById('sendt').scrollTop += 28;
  document.getElementById('sendt').scrollTop = document.getElementById('sendt').scrollHeight;
}

function login(reqUsername) {
  torbenLogin.then(() => {
    username = reqUsername;
    socket.emit('userLogin', { username: username});
    socket.on('chatLog', chatLog => {
      chatLog.forEach(msg => {
        printMsg(msg.msg);
      });
    });
    document.getElementById("sendt").style.setProperty("max-height", (window.heigth * 0.885).toString() + "px");
    document.getElementById("Overlay").remove();
  });
}

document.getElementById("loginButton").addEventListener("click", () => {
  const reqUsername = document.getElementById("username").value;
  if (reqUsername !== "") {
    document.getElementById("loginButtonText").style.display = "none";
    document.getElementById("loginButton").disabled = true;
    document.getElementById("spinner").style.display = "block";
    login(reqUsername);
  } else {
    alert("Please enter a username");
  }
});

/* Updates the memberlist everytime a new person connects*/
socket.on('login', listOfMembers => {
  updatesMemberList(listOfMembers);
});