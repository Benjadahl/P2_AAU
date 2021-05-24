import test from 'ava';
import getEmitPath from '../../torben/server/getEmitPath.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import TreeModel from 'tree-model';

const __dirname = dirname(fileURLToPath(import.meta.url));

const tree = new TreeModel();

const testTree = tree.parse(JSON.parse(fs.readFileSync(path.resolve(__dirname, './traces/all.json'))));

test('GetEmitPath Ava', t => {
  return getEmitPath(testTree, "Ava", ["Casper", "Jonas", "Lukas", "Marcus"]).then(res => {
    t.snapshot(res);
  });
});

test('GetEmitPath Jonas', t => {
  return getEmitPath(testTree, "Jonas", ["Casper", "Ava", "Lukas", "Marcus"]).then(res => {
    t.snapshot(res);
  });
});


test('GetEmitPath Casper', t => {
  return getEmitPath(testTree, "Casper", ["Ava", "Jonas", "Lukas", "Marcus"]).then(res => {
    t.snapshot(res);
  });
});