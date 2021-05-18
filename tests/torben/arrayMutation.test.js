import test from 'ava';
import arrayMutation from '../../torben/client/arrayMutation.js';
import {getCombinations} from '../../torben/client/arrayMutation.js';
import {uniqueSummingSubsets} from '../../torben/client/arrayMutation.js';
import {getMutations} from '../../torben/client/arrayMutation.js';

test('GetCombinations 3 elements', t => {
  t.snapshot(getCombinations(["ID1", "ID2", "ID3"]));
});

test('GetCombinations 4 elements', t => {
  t.snapshot(getCombinations(["ID1", "ID2", "ID3", "ID4"]));
});

test('GetCombinations 5 elements', t => {
  t.snapshot(getCombinations(["ID1", "ID2", "ID3", "ID4", "ID5", "ID6"]));
});

test('uniqueSummingSubsets 5', t => {
  t.snapshot(uniqueSummingSubsets(5));
});

test('arrayMutation 2', t => {
  t.snapshot(arrayMutation(["ID1", "ID2"]));
});

test('arrayMutation 3', t => {
  t.snapshot(arrayMutation(["ID1", "ID2", "ID3"]));
});

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