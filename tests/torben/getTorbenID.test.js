import test from 'ava';
import getTorbenID from '../../torben/server/getTorbenID.js';

// Mock
const socket = {
  id: 'mockSocket',
  emit: () => {}
}

const peerID1 = 'mockPeer1';
const peerID2 = 'mockPeer2';

test.beforeEach(t => {
	t.context.connections = {};
  t.context.torbenID1 = getTorbenID(socket, peerID1, t.context.connections);
});

test('Get torbenID for a single peer', t => {
  t.is(t.context.connections[t.context.torbenID1].peerID, peerID1);
});

test('Get torben ID for multiple peers', t => {
  getTorbenID(socket, peerID2, t.context.connections);
  t.is(Object.keys(t.context.connections).length, 2);
});

test('Check that Torben IDs are not them same', t => {
  const torbenID2 = getTorbenID(socket, peerID2, t.context.connections);
  t.assert(t.context.torbenID1 !== torbenID2);
});
