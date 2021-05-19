import 'peerjs';
import addRecieveHandler from './client/recieveMessage.js';
import TreeModel from 'tree-model';

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

  /*rttBetween (torbenID1, torbenID2) {
    rttBetween(this.map, torbenID1, torbenID2);
  }*/
}