import crypto from 'crypto';

export default function getTorbenID(socket, signalData, connections) {
  let torbenID;

  do {
    torbenID = crypto.randomBytes(16).toString('hex');
  } while (connections[torbenID] != undefined);

  connections[torbenID] = {
    signalData: signalData,
    socket: socket
  }

  return torbenID;
}