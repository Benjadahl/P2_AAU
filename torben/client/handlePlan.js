import getPeerID from "./getPeerID.js";

export default function handlePlan (peer, plan, knownIDs, socket) {
  console.log(plan);
  const recieverTorbenID = Object.keys(plan.path)[0];
  //const recieverPeerID;

  /*if (knownIDs[recieverTorbenID] != null) {
    recieverPeerID = knownIDs[recieverTorbenID];
  } else {
    getPeerID.then 
  }*/
  if (recieverTorbenID != null) {
    getPeerID(socket, recieverTorbenID).then(peerID => {
      const conn = peer.connect(peerID);
  
      conn.on("open", () => {
        conn.send(plan);
        setTimeout(() => {
          conn.close();
        }, 1000);
      });
    });
  }
}