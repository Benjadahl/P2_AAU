import test from 'ava';
import mergeTraceroutes from "../../torben/server/mergeTraceroutes.js";
import fs from 'fs';

const casperTrace = JSON.parse(fs.readFileSync('./traces/casper.json'));
const lukasTrace = JSON.parse(fs.readFileSync('./traces/lukas.json'));

test('Merge two traces together', t => {
  console.log(JSON.stringify(mergeTraceroutes(casperTrace, lukasTrace), null, 2));
  t.is(true, true);
});