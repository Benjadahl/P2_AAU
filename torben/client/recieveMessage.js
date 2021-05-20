export default function addRecieveHandler (peerObject, callback) {
  /* Open event handler run, when client has been
   assigned an ID by peerServer */
  peerObject.on('open', () => {  
    peerObject.on('connection', conn => {
      conn.on('data', data => {
        callback(data);
        conn.send('ack');
      });
    });
  });
}