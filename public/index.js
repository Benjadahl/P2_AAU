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
  let msgRow = document.createElement('div');
  let msgCol =document.createElement("div");
  newtxt.innerText = data;
  //msgRow.innerText = data;
  if(me === true){
    msgRow.className = "row" ;
    //msgCol.className ="col-12";
    newtxt.className = "text-end";
    document.getElementById("sendt").appendChild(msgRow);
    //msgRow.appendChild(msgCol);
    msgRow.appendChild(newtxt);
  }
  else{
    msgRow.className = "row" ;
    //msgCol.className ="col-12";
    //newtxt.className = "position-absolute top-0 start-0";
    document.getElementById("sendt").appendChild(msgRow);
    //msgRow.appendChild(msgCol);
    msgRow.appendChild(newtxt);
    
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