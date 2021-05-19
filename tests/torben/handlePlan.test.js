import test from 'ava';
import handlePlan from '../../torben/client/handlePlan.js';

const testPath = {
  "18958bc32e70cf78c320ee8f02939175":
  {
    "fd60edc0a6e057532061b8581a0b710f":
    {
      "6ca2b58099926e1e338441bee9fc3459":
      {
        "020d5149bfbc46431dbcfc0e8f10e80a":
        {
          "3f63d84c8a15d1f923749ee2e60a9f93":
          {
            "6344091a0be973e4d68e2f475ba62d24": {

            }
          }
        }
      }
    }
  }
}

const knownIDs = {
  "18958bc32e70cf78c320ee8f02939175": "peer1",
  "fd60edc0a6e057532061b8581a0b710f": "peer2",
  "6ca2b58099926e1e338441bee9fc3459": "peer3",
  "020d5149bfbc46431dbcfc0e8f10e80a": "peer4",
  "3f63d84c8a15d1f923749ee2e60a9f93": "peer5",
  "6344091a0be973e4d68e2f475ba62d24": "peer6"
}

test('Run handlePlan', t => {
  t.snapshot(handlePlan(testPath, knownIDs));
});
