import test from 'ava';
import getClientsInTree from '../../torben/client/getClientsInTree.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import TreeModel from 'tree-model';

const __dirname = dirname(fileURLToPath(import.meta.url));

const tree = new TreeModel();

const testTree = tree.parse(JSON.parse(fs.readFileSync(path.resolve(__dirname, './traces/all.json'))));

test('Run getClientsInTree with 5 clients', t => {
  t.snapshot(getClientsInTree(testTree));
});