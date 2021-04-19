import Traceroute from 'nodejs-traceroute';
import fs from 'fs';

const tracer = new Traceroute();
let hops = {};
  
let lastHop = hops;

tracer.on('hop', hop => {
  if (hop.ip !== "*") {
    lastHop[hop.ip] = {};
    lastHop = lastHop[hop.ip];
    console.log(hops);
  }
}).on('close', (code) => {
  fs.writeFile('hops.json', JSON.stringify(hops), 'utf8', () => {
    console.log("Wrote file");
  });
}).trace("85.203.245.236");

