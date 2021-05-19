import test from 'ava';
import {uniqueSummingSubsets} from '../../torben/client/arrayMutation.js';

test('uniqueSummingSubsets 5', t => {
  t.snapshot(uniqueSummingSubsets(5));
});
