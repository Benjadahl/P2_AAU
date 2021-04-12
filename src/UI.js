import "./index.css";
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

function updatesMemberList(members) {
  clearMembersList();
  let usernames = Object.keys(members);
  for (let i = 0; i < usernames.length; i++) {
    let newRow = membersList.insertRow(0);
    let newCell1 = newRow.insertCell(0);
    let newCell2 = newRow.insertCell(1);
    newCell1.innerHTML = usernames[i];
    console.log(usernames[i])
    newCell2.innerHTML = "Online";
  }
}

/*Make a conversation in the UI */
function makeConversation(tempMember, thisUser){
  let tempList = []
  if (tempMember != '') {
    tempList = tempMember.split(",").map(s =>s.trim());
    tempList.push(thisUser);
    console.log(tempList);
    return tempList;
  }
};
export {clearConvoList, addConvoToList, clearMembersList, updatesMemberList, makeConversation};
