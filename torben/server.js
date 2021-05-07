import getTorbenID from './server/getTorbenID.js';
import getPeerID from './server/getPeerID.js';
import TreeModel from 'tree-model';
import mergeTraceroutes from './server/mergeTraceroutes.js';
import trace from './server/trace.js';

let connections = {};
let trMap = new TreeModel();

export default function setupTorbenServer (io) {
  console.log('Set up TORBEN server');
  io.on('connection', socket => {
    socket.on('getTorbenID', peerID => {
      const torbenID = getTorbenID(socket, peerID, connections);
      const ip = socket.request.connection.remoteAddress;
      (async () => {
        const traceRoute = await trace(ip, torbenID);
        trMap = mergeTraceroutes(trMap, traceRoute);
      })();
    });
    socket.on('getPeerID', torbenID => {
      getPeerID(socket, torbenID, connections);
    });
  });
}