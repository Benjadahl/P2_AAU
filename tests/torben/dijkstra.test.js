import test from 'ava';
import dijsktra from '../../torben/client/dijkstra.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import TreeModel from 'tree-model';

const __dirname = dirname(fileURLToPath(import.meta.url));

const tree = new TreeModel();

const testTree = tree.parse(JSON.parse(fs.readFileSync(path.resolve(__dirname, './traces/avaAndCasper.json'))));

test('Run dijkstras for Ava', t => {
  t.snapshot(dijsktra(testTree, "Ava"));
});