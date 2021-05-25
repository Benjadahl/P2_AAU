import TreeModel from 'tree-model';
import Traceroute from 'nodejs-traceroute';
import getBase from './getBase.js';

export default function trace (ip, torbenID) {
  return new Promise ((resolve, reject) => {
    const tree = new TreeModel();
    let traceRoot;
    let lastHop;
    let lastBase;
    let accumulatedRtt = 0;
  
    const tracer = new Traceroute();
  
    tracer.on('hop', hop => {
      const ip = hop.ip;
      if (ip !== "*") {
        const base = getBase(ip);
        if (lastBase !== base) {
          if (traceRoot != null) {
            const rtt = parseFloat(hop.rtt1);
            lastHop = lastHop.addChild(tree.parse({ip: base, rtt: rtt - accumulatedRtt}));
            accumulatedRtt = rtt;
            lastBase = base;
          } else {
            traceRoot = tree.parse({ip: base});
            lastHop = traceRoot;
          }
        }
      }
    }).on('close', (code) => {
      lastHop.model.torbenIDs = [torbenID];
      resolve(traceRoot);
    }).trace(ip);
  });
}