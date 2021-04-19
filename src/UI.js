import "./index.css";
const membersList = document.getElementById("membersOfChat");

function clearMembersList() {
  membersList.innerHTML = "";
}

function updatesMemberList(usernames) { 
  clearMembersList();
  for (let i = 0; i < usernames.length; i++) {
    let newRow = membersList.insertRow(0);
    let newCell1 = newRow.insertCell(0);
    let newCell2 = newRow.insertCell(1);
    newCell1.innerHTML = usernames[i];
    console.log(usernames[i]);
    newCell2.innerHTML = "Online";
  }

}

export { clearMembersList, updatesMemberList };
