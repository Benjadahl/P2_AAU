const conversationList = document.getElementById("conversationList");

let currentConvo = null;

document.getElementById("sendMsg").addEventListener("click", () => {
  sendMsg(document.getElementById("exampleDataList").value, currentConvo);
  document.getElementById("exampleDataList").value = "";
});

function clearConvoList () {
  conversationList.innerHTML = "";
  document.getElementById("sendt").innerHTML = ""
}

function addConvoToList (data) {
  let newConvo = document.createElement("button");
  newConvo.classList.add("list-group-item","list-group-item-action");
  newConvo.innerText = data.ID;
  newConvo.addEventListener("click", () => {
    currentConvo = data.ID;
  });
  document.getElementById("conversationList").append(newConvo);
}
