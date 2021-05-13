import test from 'ava';
import mergeTraceroutes from "../../torben/server/mergeTraceroutes.js";
import fs from 'fs';
import TreeModel from 'tree-model';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const tree = new TreeModel();

const casperTrace = tree.parse(JSON.parse(fs.readFileSync(path.resolve(__dirname, './traces/casper.json'))));
const lukasTrace = tree.parse(JSON.parse(fs.readFileSync(path.resolve(__dirname, './traces/lukas.json'))));
const avaTrace = tree.parse(JSON.parse(fs.readFileSync(path.resolve(__dirname, './traces/ava.json'))));
const jonasTrace = tree.parse(JSON.parse(fs.readFileSync(path.resolve(__dirname, './traces/jonas.json'))));
const marcusTrace = tree.parse(JSON.parse(fs.readFileSync(path.resolve(__dirname, './traces/marcus.json'))));

test('Merge two traces together', t => {
  /*let map = mergeTraceroutes(casperTrace, lukasTrace);
  map = mergeTraceroutes(map, avaTrace);
  map = mergeTraceroutes(map, jonasTrace);
  map = mergeTraceroutes(map, marcusTrace);*/
  let map = mergeTraceroutes(casperTrace, avaTrace);
  t.snapshot(map);
});