import 'peerjs';
import addRecieveHandler from './client/recieveMessage.js';
import TreeModel from 'tree-model';
import getClientsInTree from './client/getClientsInTree.js';
import getEmitPath from './client/getEmitPath.js';

let tree = new TreeModel();

export default class Torben {
  constructor (socket) {
    this.socket = socket;
    this.trMap = tree.parse({});

    const peer = new Peer();
    peer.on('open', () => {
      socket.emit('getTorbenID', peer.id);
      socket.on('torbenID', id => this.id = id);
    });

    socket.on('newMap', map => {
      this.loadMap(map);
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

  loadMap (trMap) {
    this.trMap = tree.parse(trMap);
  }

  sendMessage (msg, recievers = 'all') {
    let toRecieve;

    if (recievers === 'all') {
      toRecieve = getClientsInTree(this.trMap);
    } else if (Array.isArray(recievers)) {
      toRecieve = recievers;
    } else {
      throw 'TORBEN - Failed to send message: Uknown reciever format';
    }

    const emitPath = getEmitPath(this.trMap, this.id, toRecieve);
  }
}