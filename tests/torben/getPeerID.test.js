import test from 'ava';
import getTorbenID from '../../torben/server/getTorbenID.js';
import getPeerID from '../../torben/server/getPeerID.js';

// Mock
const socket = {
  id: 'mockSocket',
  emit: () => {}
}

const peerID1 = 'mockPeer1';
const peerID2 = 'mockPeer2';

test.before(t => {
	let connections = {};
  const torbenID1 = getTorbenID(socket, peerID1, connections);
  const torbenID2 = getTorbenID(socket, peerID2, connections);
  t.context.fetchedPeerID1 = getPeerID(socket, torbenID1, connections);
  t.context.fetchedPeerID2 = getPeerID(socket, torbenID2, connections);
});

test('Get peerID for peer1', t => {
  t.is(t.context.fetchedPeerID1, peerID1);
});

test('Get peerID for peer2', t => {
  t.is(t.context.fetchedPeerID2, peerID2);
});

test('Check that PeerIDs are not them same', t => {
  t.assert(t.context.fetchedPeerID1 !== t.context.fetchedPeerID2);
});
