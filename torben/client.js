import Peer from 'simple-peer';
import addRecieveHandler from './client/recieveMessage.js';
import TreeModel from 'tree-model';
import getClientsInTree from './client/getClientsInTree.js';
import getEmitPath from './client/getEmitPath.js';
import getPeerID from './client/getPeerID.js';

let tree = new TreeModel();

export default class Torben {
  constructor (socket) {
    this.socket = socket;
    this.trMap = tree.parse({});
    this.knownIDs = {};
    this.recieveEvents = [];
    this.loginEvents = [];

    this.rightPeer = new Peer({ initiator: true, trickle: false });
      
    this.rightPeer.on('signal', data => {
      socket.emit('getTorbenID', JSON.stringify(data));
      socket.on('torbenID', id => {
        this.id = id;
        console.log(`TORBEN - Connected to Torben Server with ID: ${this.id}`);
        this.loginEvents.forEach(event => event());
      });
    });

    socket.on('newMap', map => {
      console.log("NEWMAP");
      console.log(map);
      this.loadMap(map);
    });

    socket.on('newRightConn', () => {
      this.rightPeer = new Peer({ initiator: true, trickle: false });
        
      this.rightPeer.on('signal', data => {
        socket.emit("rightConnRes", JSON.stringify(data));
      });
    });

    socket.on('newLeftConn', signalData => {
      this.leftPeer = new Peer({ trickle: false });
      console.log(signalData);
      this.leftPeer.signal(JSON.parse(signalData));
      this.leftPeer.on('signal', data => {
        socket.emit("leftConnRes", JSON.stringify(data));
      });
      this.leftPeer.on('data', data => {
        try {
          this.rightPeer.send(data);
        } catch (e) {
    
        }
        const recieved = JSON.parse(data);
        console.log(recieved);
        this.recieveEvents.forEach(event => event(recieved));
      });
    });

    socket.on('confirmRightConn', signalData => {
      console.log(signalData);
      this.rightPeer.signal(JSON.parse(signalData));
      this.rightPeer.on('data', data => {
        try {
          this.leftPeer.send(data);
        } catch (e) {
    
        }
        const recieved = JSON.parse(data);
        console.log(recieved);
        this.recieveEvents.forEach(event => event(recieved));
      });
    });
  }

  addEventListener (eventType, callback) {
    switch (eventType) {
      case 'recieveMsg':
        this.recieveEvents.push(callback);
        break;

      case 'login':
        this.loginEvents.push(callback);
        break;
    
      default:
        throw 'TORBEN - Failed to register event handler: Unkown eventType';
        break;
    }
  }

  loadMap (trMap) {
    this.trMap = tree.parse(trMap);
  }

  getPeerID (torbenID) {
    return new Promise ((resolve, reject) => {
      if (this.knownIDs[torbenID] != null) {
        resolve(this.knownIDs[torbenID]);
      } else {
        getPeerID(this.socket, torbenID).then(peerID => {
          this.knownIDs[torbenID] = peerID;
          resolve(peerID);
        });
      }
    });
  }

  sendMessage (msg) {
    const toSend = JSON.stringify(msg);
    console.log(this.rightPeer);
    try {
      this.rightPeer.send(toSend);
    } catch (e) {

    }
    try {
      this.leftPeer.send(toSend);
    } catch (e) {

    }
  }
}