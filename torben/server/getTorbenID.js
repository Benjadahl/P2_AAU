import crypto from 'crypto';
import Traceroute from 'nodejs-traceroute';

export default function getTorbenID(socket, peerID, connections) {
  let torbenID;

  do {
    torbenID = crypto.randomBytes(16).toString('hex');
  } while (connections[torbenID] != undefined);

  connections[torbenID] = {
    peerID: peerID,
    socket: socket,
    hops: []
  }

  const ip = socket.request.connection.remoteAddress;

  try {
    const tracer = new Traceroute();
  
    tracer.on('hop', hop => {
      connections[torbenID].hops.push(hop);
      console.log(hop);
      console.log(connections);
    }).trace(ip);
  } catch (e) {
    throw `TORBEN - Can't do traceroute: ${e}`;
  }


  socket.emit('torbenID', torbenID);
  return torbenID;
}