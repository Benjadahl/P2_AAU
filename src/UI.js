import "./index.css";
const membersList = document.getElementById("membersOfChat");

function clearMembersList() {
  membersList.innerHTML = "";
}

function updatesMemberList(users) {
  console.log(users);

  clearMembersList();
  for (let i = 0; i < users.length; i++) {
    let curUser = users[i];

    let newRow = membersList.insertRow(0);
    let newCell1 = newRow.insertCell(0);
    let newCell2 = newRow.insertCell(1);
    newCell1.innerHTML = curUser.username;
    newCell2.innerHTML = curUser.online ? "Online" : "Offline";
  }

}

function resizer() {
  let ratio;
  ratio = 1 - ((1 / window.innerHeight) * 75);
  let height = window.innerHeight * ratio;
  document.getElementById("sendt").style.setProperty("max-height", height.toString() + "px");
}

export { clearMembersList, updatesMemberList, resizer };