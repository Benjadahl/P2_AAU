/*
  generate all possible mutations of an array, containing all of the items of the original
  array

  in: array
  out: array containing all mutations of the array
*/

export default function arrayMutations(arrayIn) {
  const combinations = getCombinations(arrayIn);
  const summingSubset = uniqueSummingSubsets(arrayIn.length);

  let toReturn = [];

  summingSubset.forEach(subset => {
    let toAdd = [];

    subset.forEach(number => {
      toAdd = getMutations(toAdd, combinations[number]);
    });

    toReturn = toReturn.concat(toAdd);
  });

  return toReturn;
}

export function getCombinations(valuesArray) {
  var combi = {};
  var temp = [];
  var slent = Math.pow(2, valuesArray.length);

  for (var i = 0; i < slent; i++) {
    temp = [];
    for (var j = 0; j < valuesArray.length; j++) {
      if ((i & Math.pow(2, j))) {
        temp.push(valuesArray[j]);
      }
    }
    if (temp.length > 0) {
      if (combi[temp.length] == null) {
        combi[temp.length] = [];
      }
      combi[temp.length].push(temp);
    }
  }

  return combi;
}

export function getMutations (originalArrays, mutationArrays) {
  let toReturn = [];

  if (originalArrays.length > 0) {
    originalArrays.forEach(o => {
      mutationArrays.forEach(m => {
        const newArray = o.concat([m]);
        toReturn.push(newArray);
      });
    });
  } else {
    mutationArrays.forEach(mutation => {
      let i = toReturn.push([]);
      toReturn[i - 1].push(mutation);
    });
  }

  return toReturn;
}

export function uniqueSummingSubsets (target) {
  const allSubsets = getSummingSubsets(target);
  let allSums = [];
  let toReturn = [];

  allSubsets.forEach(subset => {
    let sum = [];

    subset.forEach(number => {
      if (sum[number] != null) {
        sum[number]++;
      } else {
        sum[number] = 0;
      }
    });

    let equal;
    for (let i = 0; i < allSums.length && !equal; i++) {
      equal = true;

      for (let j = 0; j < target; j++) {
        if (sum[j] !== allSums[i][j]) {
          equal = false;
        }
      }
    }

    if (!equal) {
      allSums.push(sum);
      toReturn.push(subset);
    }

  });

  return toReturn;
}

function getSummingSubsets(target) {
  let set_arr = [];

  for (let i = target; i > 0; i--) {
    set_arr.push(i);
  }

  let finish = [];
  let working = [[]];
  while (working.length) {
    let next_work = [];
    for (let i = 0; i < working.length; i++) {
      for (let j = 0; j < set_arr.length; j++) {
        let subset = working[i].concat([set_arr[j]]);
        let sum = subset.reduce((a, b) => a + b, 0);
        if (sum <= target) {
          (sum == target ? finish : next_work).push(subset);
        }
      }
    }
    working = next_work
  }
  return finish;
}