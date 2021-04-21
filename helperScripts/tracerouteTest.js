import Traceroute from 'nodejs-traceroute';
import fs from 'fs';
import getBase from '../torben/server/getBase.js';

const tracer = new Traceroute();
let hops = {};
  
let lastHop = hops;
let lastBase;

tracer.on('hop', hop => {
  const ip = hop.ip;
  if (ip !== "*") {
    console.log(ip);
    const base = getBase(ip);
    if (lastBase !== base) {
      lastBase = base;
      lastHop[base] = {};
      lastHop = lastHop[base];
    }
  }
}).on('close', (code) => {
  fs.writeFile('hops.json', JSON.stringify(hops), 'utf8', () => {
    console.log("Wrote file");
  });
}).trace("85.191.209.89");

