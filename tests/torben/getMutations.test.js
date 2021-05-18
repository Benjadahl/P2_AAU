import test from 'ava';
import {getMutations} from '../../torben/client/arrayMutation.js';

test('getMutations 6', t => {
  t.snapshot(getMutations(
  [
    [[1]],
    [[2]],
    [[3]]
  ],
  [
    [4],
    [5],
    [6]
  ]
  ));
});

test('getMutations empty original array', t => {
  t.snapshot(getMutations(
  [

  ],
  [
    [4],
    [5],
    [6]
  ]
  ));
});