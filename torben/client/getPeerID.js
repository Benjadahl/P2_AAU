export default function getPeerID (socket, torbenID) {
    socket.emit('getPeerID', torbenID);
    return new Promise((resolve) => {
        socket.on('peerID', peerID => {
            resolve(peerID);
        });
    });
}
