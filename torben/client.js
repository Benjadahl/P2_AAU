import 'peerjs';
import addRecieveHandler from './client/recieveMessage.js';

const peer = new Peer();

addRecieveHandler(peer, console.log);

export default function testFunction () {
  console.log("TEST");
}