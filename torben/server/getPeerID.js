export default function getPeerID (socket, torbenID, connections) {
    if (torbenID != undefined && connections[torbenID] != undefined){
        const peerID = connections[torbenID].peerID;
        socket.emit('peerID', peerID);
        return peerID;
    } else {
        throw 'TORBENID non-existent';
    }
}