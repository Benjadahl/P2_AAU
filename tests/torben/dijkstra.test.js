import test from 'ava';
import dijsktra from '../../torben/client/dijkstra.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import TreeModel from 'tree-model';

const __dirname = dirname(fileURLToPath(import.meta.url));

const tree = new TreeModel();

const testTree = tree.parse(JSON.parse(fs.readFileSync(path.resolve(__dirname, './traces/all.json'))));

test('Run dijkstras for Ava', t => {
  t.snapshot(dijsktra(testTree, "Ava"));
});

test('Run dijkstras for Casper', t => {
  t.snapshot(dijsktra(testTree, "Casper"));
});

test('Run dijkstras for Jonas', t => {
  t.snapshot(dijsktra(testTree, "Jonas"));
});

test('Run dijkstras for Lukas', t => {
  t.snapshot(dijsktra(testTree, "Lukas"));
});

test('Run dijkstras for Marcus', t => {
  t.snapshot(dijsktra(testTree, "Marcus"));
});