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

function clearLoginField() {
  let loginField = document.getElementById("Overlay");
  loginField.remove();
}


/*Make a conversation in the UI */
document.getElementById("createConvo").addEventListener("click", () => {
  let person = 0;
  let j = 0;
  let temp;
  let array = [];
  let tempMem = document.getElementById("convoMembers").value;
  if (tempMem != '') {
    tempMem += ',';
    for (let i = 0; i < tempMem.length; i++) {
      if (tempMem[i] === ',') {
        if (person != 0) {
          j = person;
        }
        person = i;
        for (j; j < person; j++) {
          if (temp == null && tempMem[j] != ',' && tempMem[j] != ' ') {
            temp = tempMem[j];
          } else if (tempMem[j] != ',' && tempMem[j] != ' ') {
            temp += tempMem[j]
          }
        }
        array.push(temp);
        temp = null;
      }
      tempMem[i] = null;
    }
    j=0;
    person=0;
    console.log(temp);
    console.log(array);
    document.getElementById("convoMembers").value = '';
    newConversation(array);
    array=[];
  }
});