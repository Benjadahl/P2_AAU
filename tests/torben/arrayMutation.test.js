import test from 'ava';
import arrayMutation from '../../torben/client/arrayMutation.js';

test('arrayMutation 2', t => {
  t.snapshot(arrayMutation(["ID1", "ID2"]));
});

test('arrayMutation 3', t => {
  t.snapshot(arrayMutation(["ID1", "ID2", "ID3"]));
});