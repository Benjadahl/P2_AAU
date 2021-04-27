import test from 'ava';
import mergeTraceroutes from "../../torben/server/mergeTraceroutes.js";
import fs from 'fs';
import TreeModel from 'tree-model';

const tree = new TreeModel();

const casperTrace = tree.parse(JSON.parse(fs.readFileSync('./traces/casper.json')));
const lukasTrace = tree.parse(JSON.parse(fs.readFileSync('./traces/lukas.json')));
const avaTrace = tree.parse(JSON.parse(fs.readFileSync('./traces/ava.json')));
const jonasTrace = tree.parse(JSON.parse(fs.readFileSync('./traces/jonas.json')));
const marcusTrace = tree.parse(JSON.parse(fs.readFileSync('./traces/marcus.json')));

test('Merge two traces together', t => {
  let map = mergeTraceroutes(casperTrace, lukasTrace);
  map = mergeTraceroutes(map, avaTrace);
  map = mergeTraceroutes(map, jonasTrace);
  map = mergeTraceroutes(map, marcusTrace);
  console.log(JSON.stringify(map.model, null, 2));
  fs.writeFile('hops.json', JSON.stringify(map.model, null, 2), 'utf8', () => {});
  t.is(true, true);
});