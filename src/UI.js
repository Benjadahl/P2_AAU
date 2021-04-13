import "./index.css";
const conversationList = document.getElementById("conversationList");
const membersList = document.getElementById("membersOfChat");

let curConversation;

function clearConvoList() {
  conversationList.innerHTML = "";
  document.getElementById("sendt").innerHTML = ""
}

function addConvoToList(conversation) {
  const ID = conversation.ID;
  let newConvo = document.createElement("button");
  newConvo.classList.add("list-group-item", "list-group-item-action");
  newConvo.innerText = ID;
  newConvo.addEventListener("click", () => {
    curConversation = ID;
    updatesMemberList(conversation.members);
  });

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
function parseUserString(tempMember, thisUser){
  let tempList = []
  if (tempMember != '') {
    tempList = tempMember.split(",").map(name => name.trim());
    tempList.push(thisUser);
    console.log(tempList);
    return tempList;
  }
};

function getCurConversation () {
  return curConversation;
}

export {clearConvoList, addConvoToList, clearMembersList, updatesMemberList, parseUserString, getCurConversation};