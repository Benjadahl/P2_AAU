import getTorbenID from './server/getTorbenID.js';
import getPeerID from './server/getPeerID.js';

let connections = {};

export default function setupTorbenServer (io) {
  console.log('Set up TORBEN server');
  io.on('connection', socket => {
    socket.on('getTorbenID', peerID => {
      getTorbenID(socket, peerID, connections);
    });
    socket.on('getPeerID', torbenID => {
      getPeerID(socket, torbenID, connections);
    });
  });
}