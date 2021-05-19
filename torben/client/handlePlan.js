import getPeerID from "./getPeerID.js";

export default function handlePlan (peer, plan, knownIDs, socket) {
  console.log();
  const recieverTorbenID = Object.keys(plan)[0];
  //const recieverPeerID;

  /*if (knownIDs[recieverTorbenID] != null) {
    recieverPeerID = knownIDs[recieverTorbenID];
  } else {
    getPeerID.then 
  }*/

  getPeerID(socket, recieverTorbenID).then(peerID => {
    const conn = peer.connect(peerID);
    console.log(conn);

    conn.on("open", () => {
      conn.send("testMsg");
      setTimeout(() => {
        conn.close();
      }, 1000);
    });

    /*conn.on('data', data => {
      console.log(data);
      if (data === "connOpen") {
        conn.send("testMSG")
      }
    });*/
  });

  //console.log(recieverPeerID);
}