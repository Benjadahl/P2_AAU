import crypto from 'crypto';

export default function getTorbenID (connections) {
  socket.on('getTorbenID', peerID => {
    const torbenID = crypto.randomBytes(16).toString('hex');

    connections[torbenID] = {
      peerID: peerID,
      socket: socket
    }
    
    socket.emit('torbenID', torbenID);
    console.log(connections);
  });
}