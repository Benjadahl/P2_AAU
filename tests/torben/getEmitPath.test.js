import test from 'ava';
import getEmitPath from '../../torben/client/getEmitPath.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import TreeModel from 'tree-model';

const __dirname = dirname(fileURLToPath(import.meta.url));

const tree = new TreeModel();

const testTree = tree.parse(JSON.parse(fs.readFileSync(path.resolve(__dirname, './traces/all.json'))));

test('GetEmitPath', t => {
  return getEmitPath(testTree, "Ava", ["Casper", "Jonas", "Lukas", "Marcus"]).then(res => {
    //console.log(JSON.stringify(res, null, 2));
    t.snapshot(res);
  });
});