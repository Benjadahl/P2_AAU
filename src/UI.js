const conversationList = document.getElementById("conversationList");

function clearConvoList () {
  conversationList.innerHTML = "";
}

function addConvoToList (data) {
  let newConvo = document.createElement("button");
  newConvo.classList.add("list-group-item", "list-group-item-action");
  newConvo.innerText = data.ID;
  document.getElementById("conversationList").append(newConvo);
}

module.exports = {clearConvoList: clearConvoList, addConvoToList: addConvoToList};