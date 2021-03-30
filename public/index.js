const socket = io();
let Hight;
let windowHight;
const chatRatio = 0.90;
const roomRatio = 0.97;

reSize(chatRatio, "sendt");
reSize(chatRatio, "members");
reSize(roomRatio, "chatGroup");

window.addEventListener("resize", function(){
  reSize(chatRatio, "sendt");
  reSize(chatRatio, "members");
  reSize(roomRatio, "chatGroup");
})



function reSize(ratio, id){
  Hight = window.innerHeight * ratio;
  console.log(Hight);
  document.getElementById(id).style = "max-height: "+ Hight+"px;"
  
}

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
  newtxt.innerText = data;
  msgRow.className = "row" ;
  if(me === true){
    newtxt.className = "text-end";
  }
  
  document.getElementById("sendt").appendChild(msgRow);   
  msgRow.appendChild(newtxt);
}

socket.on('peer-msg', data => {
  printMsg(data);
});

socket.on('chatLog', chatLog => {
  chatLog.forEach(msg => {
    printMsg(msg);
  });
});
