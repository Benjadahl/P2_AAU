import 'peerjs';
const peer = new Peer();

/* Open event handler run, when client has been
   assigned an ID by peerServer */
peer.on('open', () => {
  console.log(peer.id);

  peer.on('connection', conn => {
    conn.on('data', data => {
      printMsg(data);
    });
  });
});

/* Sends direct messages by opening connections to all
   peers in the relevant conversation. Connection is 
   cleaned up after sending. */
function sendDirectMsg (msg, Conversation) {
  for (const member in Conversation.members) {
    const peerID = Conversation.members[member];
    let conn = peer.connect(peerID);
    conn.on("open", () => {
      conn.send({msg: msg, timestamp: Date.now(), username: username});
      setTimeout(() => {
        conn.close();
      }, 1000);
    });
  }
};


export function getPeerJSid () {
  return peer.id;
}