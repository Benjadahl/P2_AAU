export default function getPeerID (socket, torbenID) {
    console.log("Fetching peer ID from server for: " + torbenID);
    socket.emit('getPeerID', torbenID);
    return new Promise((resolve) => {
        let listener = socket.on('peerID', peerID => {
            resolve(peerID);
            socket.off('peerID', listener);
        });
    });
}
