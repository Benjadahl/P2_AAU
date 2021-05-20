import getTorbenID from './server/getTorbenID.js';
import getPeerID from './server/getPeerID.js';
import TreeModel from 'tree-model';
import mergeTraceroutes from './server/mergeTraceroutes.js';
import trace from './server/trace.js';
import removeClient from './server/removeClient.js';

let connections = {};
let tree = new TreeModel();
let trMap;

export default function setupTorbenServer (io) {
  console.log('Set up TORBEN server');
  io.on('connection', socket => {
    socket.on('getTorbenID', peerID => {
      const torbenID = getTorbenID(socket, peerID, connections);
      const ip = socket.request.connection.remoteAddress;
      (async () => {
        const traceRoute = await trace(ip, torbenID);
        if (trMap != null) {
          trMap = mergeTraceroutes(trMap, traceRoute);
        } else {
          trMap = traceRoute;
        }
        pushMap(io, trMap);
      })();
    });
    socket.on('getPeerID', torbenID => {
      getPeerID(socket, torbenID, connections);
    });
    socket.on('disconnect', () => {
      for (let torbenID of Object.keys(connections)) {
        const connection = connections[torbenID];

        if (connection.socket.id === socket.id) {
          removeClient(trMap, torbenID);
          pushMap(io, trMap);
          break;
        }
      }
    });
  });
}

function pushMap (io, map) {
  io.emit("newMap", map.model);
}