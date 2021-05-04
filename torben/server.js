import getTorbenID from './server/getTorbenID.js';
import getPeerID from './server/getPeerID.js';
import traceClient from './server/traceRoute.js';

let connections = {};

export default function setupTorbenServer (io) {
  console.log('Set up TORBEN server');
  io.on('connection', socket => {
    socket.on('getTorbenID', peerID => {
      const torbenID = getTorbenID(socket, peerID, connections);
      traceClient(socket, torbenID, connections);
    });
    socket.on('getPeerID', torbenID => {
      getPeerID(socket, torbenID, connections);
    });
  });
}