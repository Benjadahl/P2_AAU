import Traceroute from 'nodejs-traceroute';

export default function traceClient (socket, torbenID, connections) {
  const ip = socket.request.connection.remoteAddress;
  
  try {
    const tracer = new Traceroute();
  
    tracer.on('hop', hop => {
      connections[torbenID].hops.push(hop);
      console.log(hop);
      console.log(connections);
    }).trace(ip);
  } catch (e) {
    throw `TORBEN - Can't do traceroute: ${e}`;
  }
}