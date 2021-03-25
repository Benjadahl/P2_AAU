const socket = io();

document.getElementById("sendMsg").addEventListener("click", () => {
  
    sendMsg(document.getElementById("exampleDataList").value);
    document.getElementById("exampleDataList").value = "";
});
function sendMsg(data) {
  socket.emit('msg', data);
  printMsg(data, true);
}

function printMsg(data, me) {
  console.log('Message: ' + data);
  let newtxt = document.createElement("H6");
  newtxt.innerText = data;
  /*newtxt.style.position = "absolute"
  if(me === true){
    newtxt.style.right = 0;
  }
  else{
    newtxt.style.right = 0;
  }*/
  
  document.getElementById("sendt").appendChild(newtxt);
}

socket.on('peer-msg', data => {
  printMsg(data);
});

socket.on('chatLog', chatLog => {
  chatLog.forEach(msg => {
    printMsg(msg);
  });
});