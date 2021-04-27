import test from 'ava';
import mergeTraceroutes from "../../torben/server/mergeTraceroutes.js";
import fs from 'fs';
import TreeModel from 'tree-model';

const tree = new TreeModel();

const casperTrace = tree.parse(JSON.parse(fs.readFileSync('./traces/casper.json')));
const lukasTrace = tree.parse(JSON.parse(fs.readFileSync('./traces/lukas.json')));

test('Merge two traces together', t => {
  console.log(JSON.stringify(mergeTraceroutes(casperTrace, lukasTrace), null, 2));
  t.is(true, true);
});