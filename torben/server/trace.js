import TreeModel from 'tree-model';
import Traceroute from 'nodejs-traceroute';
import getBase from './getBase.js';

export default function trace (ip, torbenID) {
  return new Promise ((resolve, reject) => {
    const tree = new TreeModel();
    let traceRoot;
    let lastHop;
    let lastBase;
  
    const tracer = new Traceroute();
  
    tracer.on('hop', hop => {
      const ip = hop.ip;
      if (ip !== "*") {
        const base = getBase(ip);
        if (lastBase !== base) {
          if (traceRoot != null) {
            lastBase = base;
            lastHop = lastHop.addChild(tree.parse({ip: base, rtt: hop.rtt1}));
          } else {
            traceRoot = tree.parse({ip: base});
            lastHop = traceRoot;
          }
        }
      }
    }).on('close', (code) => {
      lastHop.model.torbenID = torbenID;
      resolve(traceRoot);
    }).trace(ip);
  });
}