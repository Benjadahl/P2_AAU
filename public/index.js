const socket = io();

document.getElementById("sendMsg").addEventListener("click", () => {
  
    sendMsg(document.getElementById("exampleDataList").value);
    document.getElementById("exampleDataList").value = "";
});
function sendMsg(data) {
  socket.emit('msg', data, false);
  printMsg(data, true);
}

function printMsg(data, me) {
  console.log('Message: ' + data);
  let newtxt = document.createElement("H6");
  //let pos = document.createElement("DIV");
  newtxt.innerText = data;
  //newtxt.style.position = "relative"
  if(me === true){
    document.getElementById("sendt").appendChild(newtxt);
  }
  else{
    document.getElementById("recived").appendChild(newtxt);
  }
  
  
}

socket.on('peer-msg', data => {
  printMsg(data);
});

socket.on('chatLog', chatLog => {
  chatLog.forEach(msg => {
    printMsg(msg);
  });
});