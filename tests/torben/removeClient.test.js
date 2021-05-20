import test from 'ava';
import removeClient from '../../torben/server/removeClient.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import TreeModel from 'tree-model';

const __dirname = dirname(fileURLToPath(import.meta.url));

const tree = new TreeModel();

const testTree = tree.parse(JSON.parse(fs.readFileSync(path.resolve(__dirname, './traces/all.json'))));

test('Remove Ava from the tree', t => {
  t.snapshot(removeClient(testTree, "Ava").model);
});

test('Remove Casper from the tree', t => {
  t.snapshot(removeClient(testTree, "Casper").model);
});

test('Remove Lukas from the tree', t => {
  t.snapshot(removeClient(testTree, "Lukas").model);
});