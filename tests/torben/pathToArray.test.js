import test from 'ava';
import pathToArray from "../../torben/server/pathToArray.js";

const testObject = 
{
  Lukas: {
    Marcus: {
      Ava: {
        Jonas: {},
      },
    },
  },
};

test('pathToArray', t => {
  t.snapshot(pathToArray(testObject));
});
