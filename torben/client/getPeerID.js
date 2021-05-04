export default function getPeerID (socket, torbenID) {
    socket.emit('getPeerID', torbenID);
    return new Promise((resolve) => {
        let listener = socket.on('peerID', peerID => {
            resolve(peerID);
            socket.off('peerID', listener);
        });
    });
}
