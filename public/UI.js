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
  let endOfName = 0;
  let j = 0;
  let temp;
  let tempList = [];
  let tempMember = document.getElementById("convoMembers").value;
  if (tempMember != '') {
    tempMember += ',';
    for (let i = 0; i < tempMember.length; i++) {
      if (tempMember[i] === ',') {
        if (endOfName != 0) {
          j = endOfName;
        }
        endOfName = i;
        for (j; j < endOfName; j++) {
          if (temp == null && tempMember[j] != ',' && tempMember[j] != ' ') {
            temp = tempMember[j];
          } else if (tempMember[j] != ',' && tempMember[j] != ' ') {
            temp += tempMember[j]
          }
        }
        tempList.push(temp);
        temp = null;
      }
    }
    tempList.push(thisUser);
    document.getElementById("convoMembers").value = '';
    newConversation(tempList);
  }
});