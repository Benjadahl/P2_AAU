import getTorbenID from './server/getTorbenID.js';
import getPeerID from './server/getPeerID.js';
import TreeModel from 'tree-model';
import mergeTraceroutes from './server/mergeTraceroutes.js';
import trace from './server/trace.js';
import removeClient from './server/removeClient.js';
import getChain from './server/getChain.js';


let connections = {};
let tree = new TreeModel();
let trMap;

export default function setupTorbenServer (io) {
  console.log('Set up TORBEN server');
  io.on('connection', socket => {
    socket.on('getTorbenID', signalData => {
      console.log(signalData);
      const torbenID = getTorbenID(socket, JSON.parse(signalData), connections);
      const ip = socket.request.connection.remoteAddress;
      (async () => {
        const traceRoute = await trace(ip, torbenID);
        if (trMap != null) {
          trMap = mergeTraceroutes(trMap, traceRoute);
        } else {
          trMap = traceRoute;
        }
        const chain = await getChain(trMap);
        for (let i = 0; i < chain.length; i++) {
          const ID = chain[i];
          console.log(ID);

          if (i != chain.length - 1) {
            //If we are not the last element, handle right connection
            const sender = connections[chain[i]];
            const reciever = connections[chain[i + 1]];
            reciever.socket.emit("newLeftConn", JSON.stringify(sender.signalData));
            reciever.socket.on("signal", signal => {
              sender.socket.emit("newRightConn", JSON.stringify(signal));
            });
          }
        }

        //pushMap(io, trMap);
        socket.emit('torbenID', torbenID);
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