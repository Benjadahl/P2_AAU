import Peer from 'simple-peer';
import TreeModel from 'tree-model';

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
        this.sendRight(data);
        const recieved = JSON.parse(data);
        console.log(recieved);
        this.recieveEvents.forEach(event => event(recieved));
      });
    });

    socket.on('confirmRightConn', signalData => {
      console.log(signalData);
      this.rightPeer.signal(JSON.parse(signalData));
      this.rightPeer.on('data', data => {
        this.sendLeft(data);
        const recieved = JSON.parse(data);
        console.log(recieved);
        this.recieveEvents.forEach(event => event(recieved));
      });
    });
  }

  sendRight (toSend) {
    try {
      this.rightPeer.send(toSend);
    } catch (e) {

    }
  }

  sendLeft (toSend) {
    try {
      this.leftPeer.send(toSend);
    } catch (e) {

    }
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

  sendMessage (msg) {
    const toSend = JSON.stringify(msg);
    console.log(this.rightPeer);
    this.sendRight(toSend);
    this.sendLeft(toSend);
  }
}