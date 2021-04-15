import crypto from 'crypto';

export default function getTorbenID(socket, peerID, connections) {
  let torbenID;

  do {
    torbenID = crypto.randomBytes(16).toString('hex');
  } while (connections[torbenID] != undefined)

  connections[torbenID] = {
    peerID: peerID,
    socket: socket
  }

  socket.emit('torbenID', torbenID);
  return torbenID;
}