const conversationList = document.getElementById("conversationList");
const membersList = document.getElementById("membersOfChat");

function clearConvoList() {
  conversationList.innerHTML = "";
  document.getElementById("sendt").innerHTML = ""
}

function addConvoToList(data) {
  let newConvo = document.createElement("button");
  newConvo.classList.add("list-group-item", "list-group-item-action");
  newConvo.innerText = data.ID;
  newConvo.id = data.ID;
  document.getElementById("conversationList").append(newConvo);
}

function clearMembersList() {
  membersList.innerHTML = "";
}

function addMemberToList(data) {
  let newRow;
  let newCell1; 
  let newCell2;
  clearMembersList();
  for (let i = 0; i < data.members.length; i++) {
    newRow = membersList.insertRow(0);
    newCell1 = newRow.insertCell(0);
    newCell2 = newRow.insertCell(1);
    newCell1.innerHTML = data.members[i];
    newCell2.innerHTML = "    Online";
  }
}

function clearLoginField(){
  let loginField=document.getElementById("loginField");
  loginField.remove();
}