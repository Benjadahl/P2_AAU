import Traceroute from 'nodejs-traceroute';
import fs from 'fs';

const tracer = new Traceroute();
let hops = [];
  
tracer.on('hop', hop => {
  hops.push(hop);
}).on('close', (code) => {
  fs.writeFile('hops.json', JSON.stringify(hops), 'utf8', () => {
    console.log("Wrote file");
  });
}).trace("8.8.8.8");

