import test from 'ava';
import dijkstra from '../../torben/server/dijkstra.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import TreeModel from 'tree-model';

const __dirname = dirname(fileURLToPath(import.meta.url));

const tree = new TreeModel();

const testTree = tree.parse(JSON.parse(fs.readFileSync(path.resolve(__dirname, './traces/all.json'))));

test('Run dijkstras for Ava', t => {
  t.snapshot(dijkstra(testTree, "Ava"));
});

test('Run dijkstras for Casper', t => {
  t.snapshot(dijkstra(testTree, "Casper"));
});

test('Run dijkstras for Jonas', t => {
  t.snapshot(dijkstra(testTree, "Jonas"));
});

test('Run dijkstras for Lukas', t => {
  t.snapshot(dijkstra(testTree, "Lukas"));
});

test('Run dijkstras for Marcus', t => {
  t.snapshot(dijkstra(testTree, "Marcus"));
});