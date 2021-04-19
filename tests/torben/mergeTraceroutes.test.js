import test from 'ava';
import mergeTraceroutes from "../../torben/server/mergeTraceroutes.js";

test('Merge two traces together', t => {
  console.log(mergeTraceroutes(["test1"], ["test2"]));
  t.is(true, true);
});