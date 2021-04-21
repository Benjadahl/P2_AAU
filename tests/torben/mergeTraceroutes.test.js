import test from 'ava';
import mergeTraceroutes from "../../torben/server/mergeTraceroutes.js";
import fs from 'fs';

const avaTrace = JSON.parse(fs.readFileSync('./traces/ava.json'));
const jonasTrace = JSON.parse(fs.readFileSync('./traces/jonas.json'));

test('Merge two traces together', t => {
  console.log(mergeTraceroutes(avaTrace, jonasTrace));
  t.is(true, true);
});