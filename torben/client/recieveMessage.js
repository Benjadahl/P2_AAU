export default function addRecieveHandler (peerObject, callback) {
  console.log("test");
  /* Open event handler run, when client has been
   assigned an ID by peerServer */
  peerObject.on('open', () => {
    console.log(peerObject.id);
  
    peerObject.on('connection', conn => {
      conn.on('data', data => {
        callback(data);
      });
    });
  });
}