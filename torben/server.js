import getTorbenID from './server/getTorbenID.js';
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
      const torbenID = getTorbenID(socket, JSON.parse(signalData), connections);
      const ip = socket.request.connection.remoteAddress;
      (async () => {
        const traceRoute = await trace(ip, torbenID);
        if (trMap != null) {
          trMap = mergeTraceroutes(trMap, traceRoute);
        } else {
          trMap = traceRoute;
        }
        chainClients(trMap);

        socket.emit('torbenID', torbenID);
      })();
    });

    socket.on('disconnect', () => {
      for (let torbenID of Object.keys(connections)) {
        const connection = connections[torbenID];

        if (connection.socket.id === socket.id) {
          removeClient(trMap, torbenID);
          chainClients(trMap);
          break;
        }
      }
    });
  });
}

function chainClients (trMap) {
  getChain(trMap).then(chain => {
    console.log(chain);
    for (let i = 0; i < chain.length - 1; i++) {
      const ID = chain[i];
      const sender = connections[chain[i]];
      const reciever = connections[chain[i + 1]];
      bindClients(sender, reciever);
    }
  });
}

function bindClients (rightConn, leftConn) {
  rightConn.socket.emit("newRightConn");
  rightConn.socket.on("rightConnRes", function sig (signal) {
    leftConn.socket.emit("newLeftConn", signal);
    rightConn.socket.off("rightConnRes", sig);
    leftConn.socket.on("leftConnRes", function sig (signal) {
      rightConn.socket.emit("confirmRightConn", signal);
      console.log("FINISHED BIND");
      leftConn.socket.off("leftConnRes", sig);
    });
  });
}