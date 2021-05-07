import 'peerjs';
import addRecieveHandler from './client/recieveMessage.js';
import TreeModel from 'tree-model';

let tree = new TreeModel();
let trMap = tree.parse({});

export default class Torben {
  constructor (socket) {
    const peer = new Peer();
    peer.on('open', () => {
      socket.emit('getTorbenID', peer.id);
      socket.on('torbenID', id => this.id = id);
    });

    socket.on('newMap', map => {
      trMap = tree.parse(map);
    });
  }

  registerEventHandler (eventType, callback) {
    switch (eventType) {
      case 'recieveMsg':
        addRecieveHandler(this.peer, callback);
        break;
    
      default:
        throw 'TORBEN - Failed to register event handler: Unkown eventType';
        break;
    }
  }
}