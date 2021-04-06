let peerJS = new Peer();

/* Open event handler run, when client has been
   assigned an ID by peerServer */
peerJS.on('open', () => {
  console.log(peerJS.id);

  peerJS.on('connection', conn => {
    conn.on('data', data => {
      printMsg(data);
    });
  });
});

/* Sends direct messages by opening connections to all
   peers in the relevant conversation. Connection is 
   cleaned up after sending. */
function sendDirectMsg (msg, convoID) {
  for (const member in conversations[convoID].members) {
    const peerID = conversations[convoID].members[member];
    let conn = peerJS.connect(peerID);
    conn.on("open", () => {
      conn.send({ID: convoID, msg: msg, timestamp: Date.now(), username: username});
      setTimeout(() => {
        conn.close();
      }, 1000);
    });
  }
}