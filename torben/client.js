import 'peerjs';
import addRecieveHandler from './client/recieveMessage.js';

/*peerObject.on('open', () => {

});*/

export default class Torben {
  constructor (socket) {
    const peer = new Peer();
    peer.on('open', () => {
      socket.emit('getTorbenID', peer.id);
      socket.on('torbenID', id => this.id = id);
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