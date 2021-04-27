import TreeModel from 'tree-model';
import Traceroute from 'nodejs-traceroute';
import fs from 'fs';
import getBase from '../torben/server/getBase.js';

const tree = new TreeModel();
let traceRoot;
let lastHop;
let lastBase;

const tracer = new Traceroute();

tracer.on('hop', hop => {
  const ip = hop.ip;
  if (ip !== "*") {
    console.log(ip);
    const base = getBase(ip);
    if (lastBase !== base) {
      if (traceRoot != null) {
        lastBase = base;
        lastHop = lastHop.addChild(tree.parse({ip: base}));
      } else {
        traceRoot = tree.parse({ip: base});
        lastHop = traceRoot;
      }
    }
  }
}).on('close', (code) => {
  fs.writeFile('hops.json', JSON.stringify(traceRoot.model), 'utf8', () => {
    console.log("Wrote file");
  });
}).trace("87.61.202.221");

