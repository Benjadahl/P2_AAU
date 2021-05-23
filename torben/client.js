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
    this.leftPeer = new Peer({ trickle: false });
    
    this.rightPeer.on('signal', data => {
      socket.emit('getTorbenID', data);
      socket.on('torbenID', id => {
        this.id = id;
        console.log(`TORBEN - Connected to Torben Server with ID: ${this.id}`);
        this.loginEvents.forEach(event => event());
      });
    });
    /*peer.on('open', () => {
      socket.emit('getTorbenID', peer.id);
      socket.on('torbenID', id => {
        this.id = id;
        console.log(`TORBEN - Connceted to Torben Server with ID: ${this.id}`);
        this.loginEvents.forEach(event => event());
      })
    });*/

    /*addRecieveHandler(peer, recievedPlan => {
      this.recieveEvents.forEach(event => event(recievedPlan.msg));

      const recieverTorbenID = Object.keys(recievedPlan.path)[0];
      recievedPlan.path = recievedPlan.path[recieverTorbenID];
      this.handlePlan(recievedPlan);
    });*/

    //this.peer = peer;

    socket.on('newMap', map => {
      console.log("NEWMAP");
      console.log(map);
      this.loadMap(map);
    });

    socket.on('newLeftConn', signalData => {
      console.log(signalData);
      this.leftPeer.signal(signalData);
      this.leftPeer.on('signal', data => {
        socket.emit("signal", data);
      });
      this.leftPeer.on('data', data => {
        // got a data channel message
        console.log('got a message from peer1: ' + data)
      });
    });

    socket.on('newRightConn', signalData => {
      console.log(signalData);
      this.rightPeer.signal(signalData);
      this.rightPeer.on('connect', () => {
        // wait for 'connect' event before using the data channel
        this.rightPeer.send('hey peer2, how is it going?')
      })
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

  sendMessage (msg, recievers = 'all') {
    let toRecieve;

    if (recievers === 'all') {
      toRecieve = getClientsInTree(this.trMap).filter(rID => rID !== this.id);
    } else if (Array.isArray(recievers)) {
      toRecieve = recievers;
    } else {
      throw 'TORBEN - Failed to send message: Uknown reciever format';
    }

    const emitPath = getEmitPath(this.trMap, this.id, toRecieve);
    emitPath.then(ePath => {
      console.log("Sending plan: ");
      console.log(ePath);
      let plan = {
        path: ePath.path,
        msg: msg
      };
      //this.handlePlan(plan);
    });
  }

  /*handlePlan (plan) {
    console.log(plan);
    const recieverTorbenID = Object.keys(plan.path)[0];
    if (recieverTorbenID != null) {
      this.getPeerID(recieverTorbenID).then(peerID => {
        const conn = this.peer.connect(peerID);
    
        conn.on("open", () => {
          conn.send(plan);
          conn.on("data", data => {
            if (data === "ack") {
              conn.close();
            }
          });
        });
      });
    }
  };*/
}