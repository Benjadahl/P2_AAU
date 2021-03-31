import 'peerjs';
const peer = new Peer();
let peers = [];

/* Open event handler run, when client has been
   assigned an ID by peerServer */
peer.on('open', () => {
  console.log(peer.id);

  peer.on('connection', conn => {
    conn.on('data', data => {
      printMsg(data);
    });
  });
  
  /*socket.on('newPeer', ID => {
    let conn = peer.connect(ID);
    console.log(ID);
    peers.push(conn);
  });*/
});

function sendDirectMsg (msg) {
  peers.forEach(peer => {
    peer.send(msg);
  });
}

export {sendDirectMsg};