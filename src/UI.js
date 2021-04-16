import "./index.css";
const membersList = document.getElementById("membersOfChat");

// No convolist anymore and therefore needs to be removed.
function addConvoToList(conversation) {
  const ID = conversation.ID;
  let newConvo = document.createElement("button");
  newConvo.classList.add("list-group-item", "list-group-item-action");
  newConvo.innerText = ID;

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

export { addConvoToList, clearMembersList, updatesMemberList };