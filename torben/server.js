import getTorbenID from './server/getTorbenID.js';
import findMask from './server/getBase.js';

let connections = {};

export default function setupTorbenServer (io) {
  console.log('Set up TORBEN server');
  io.on('connection', socket => {
    socket.on('getTorbenID', peerID => {
      getTorbenID(socket, peerID, connections);
    });
  });

  console.log(findMask('128.184.128.151'));
}