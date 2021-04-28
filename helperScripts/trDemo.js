import trace from "../torben/server/trace.js";
import mergeTraceroutes from "../torben/server/mergeTraceroutes.js";
import fs from 'fs';

console.log("Running parallel traces...");

let traces = [];
traces.push(trace("188.114.149.181", "Ava"));
traces.push(trace("130.226.213.106", "Marcus"));
traces.push(trace("85.203.245.236", "Jonas"));
traces.push(trace("87.61.202.221", "Lukas"));
traces.push(trace("77.213.123.14", "Casper"));

Promise.all(traces).then(theTraces => {
  let trace = theTraces[0];
  
  console.log("Merging traces: ");
  for (let i = 1; i < theTraces.length; i++) {
    console.log(i);
    trace = mergeTraceroutes(trace, theTraces[i]);
  }
  
  fs.writeFile('hops.json', JSON.stringify(trace.model, null, 2), 'utf8', () => {
    console.log("Wrote file");
  });
});
