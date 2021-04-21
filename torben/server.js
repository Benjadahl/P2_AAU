import getTorbenID from './server/getTorbenID.js';
import sameNetwork from './server/sameNetwork.js';

let connections = {};

export default function setupTorbenServer (io) {
  console.log('Set up TORBEN server');
  io.on('connection', socket => {
    socket.on('getTorbenID', peerID => {
      getTorbenID(socket, peerID, connections);
    });
  });

  console.log(sameNetwork('89.184.128.151', '89.174.148.152'));
}