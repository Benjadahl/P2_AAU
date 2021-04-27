import getTorbenID from './server/getTorbenID.js';

let connections = {};

export default function setupTorbenServer (io) {
  console.log('Set up TORBEN server');
  io.on('connection', socket => {
    socket.on('getTorbenID', peerID => {
      getTorbenID(socket, peerID, connections);
    });
  });
}