let log = [];
let neo;

document.getElementById("sendMsg").addEventListener("click", newmsg);
function newmsg() {
    /*take the text inputede in exampleDataList and add it to the end of the log array when the btn is pressed*/
    neo = document.getElementById("exampleDataList").value;
    if (neo != "") {
        let newtxt = document.createElement("H6");
        log.push(neo);
        document.getElementById("exampleDataList").value = "";
        console.log(log);
        newtxt.innerHTML = neo;
        newtxt.style.position = "absolute";
        newtxt.style.right = 0;
        document.getElementById("sendt").appendChild(newtxt);
    }
}