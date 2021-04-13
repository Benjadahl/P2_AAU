import crypto from 'crypto';

let connections = {};

export default function setupTorbenServer (io) {
  console.log('Set up TORBEN server');
  io.on('connection', socket => {
    socket.on('getTorbenID', peerID => {
      const torbenID = crypto.randomBytes(16).toString('hex');

      connections[torbenID] = {
        peerID: peerID,
        socket: socket
      }
      
      socket.emit('torbenID', torbenID);
      console.log(connections);
    });
  });
}