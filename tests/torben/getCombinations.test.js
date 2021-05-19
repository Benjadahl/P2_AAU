import test from 'ava';
import {getCombinations} from '../../torben/client/arrayMutation.js';

test('GetCombinations 3 elements', t => {
  t.snapshot(getCombinations(["ID1", "ID2", "ID3"]));
});

test('GetCombinations 4 elements', t => {
  t.snapshot(getCombinations(["ID1", "ID2", "ID3", "ID4"]));
});

test('GetCombinations 5 elements', t => {
  t.snapshot(getCombinations(["ID1", "ID2", "ID3", "ID4", "ID5", "ID6"]));
});