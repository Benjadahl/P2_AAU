import crypto from 'crypto';

export default function getTorbenID (socket, peerID, connections) {
  const torbenID = crypto.randomBytes(16).toString('hex');

  connections[torbenID] = {
    peerID: peerID,
    socket: socket
  }
  
  socket.emit('torbenID', torbenID);
  return torbenID;
}