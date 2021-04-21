export default function mergeTraceroutes (trX, trY) {
  let promiseListX = [];
  let promiseListY = [];
  getIPRecursive(trX, Object.keys(trX)[0], promiseListX);
  getIPRecursive(trY, Object.keys(trY)[0], promiseListY);
  Promise.all(promiseListX).then(x => {
    Promise.all(promiseListY).then(y => {
      console.log(x);
      console.log(y);

      let match;

      x.forEach(xIp => {
        y.forEach(yIp => {
          if (xIp.ip === yIp.ip && match == null) {
            match = xIp;
          }
        });
      });

      match.obj["test"] = "test";
      console.log(match);
    });
  });

  return trX;
}

function getIPRecursive (obj, ip, promiseList) {
  return new Promise ((resolve, reject) => {
    Object.keys(obj).forEach(child => {
      if (child !== "torbenClients") {
        promiseList.push(getIPRecursive(obj[child], child, promiseList));
      }
      resolve({ip: ip, obj: obj});
    });
  });
}