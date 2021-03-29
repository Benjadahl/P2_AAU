let peerJS = new Peer();
let peers = [];

/* Open event handler run, when client has been
   assigned an ID by peerServer */
peerJS.on('open', function(){
  console.log(peerJS.id);
  socket.emit('peerID', peerJS.id);

  peerJS.on('connection', conn => {
    conn.on('data', data => {
      printMsg(data);
    });
  });
  
  socket.on('newPeer', ID => {
    let conn = peerJS.connect(ID);
    console.log(ID);
    peers.push(conn);
  });
});

function sendDirectMsg (msg) {
  peers.forEach(peer => {
    peer.send(msg);
  });
}




