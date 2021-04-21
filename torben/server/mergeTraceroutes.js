export default function mergeTraceroutes(trX, trY) {
  getSubtree(trX, "69").then(r => {
    console.log(JSON.stringify(r, null, 2));
  });
  
  /*let promiseListX = [];
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
            match = { ip: xIp.ip, idX: xIp.id, idY: yIp.id };
          }
        });
      });

      console.log(match);
    });
  });*/

  //return trX;
}

function getIPRecursive(obj, ip, promiseList) {
  return new Promise((resolve, reject) => {
    Object.keys(obj).forEach(child => {
      if (child !== "torbenClients" && child !== "id") {
        promiseList.push(getIPRecursive(obj[child], child, promiseList));
      }
      resolve({ ip: ip, id: obj.id });
    });
  });
}

function insertSubtree(obj, id, subtree) {

}

function getSubtree(obj, id) {
  return new Promise((resolve, reject) => {
    if (obj.id === id) {
      resolve(obj);
    } else {
      let childTraverses = [];

      Object.keys(obj).forEach(child => {
        if (child !== "torbenClients" && child !== "id") {
          childTraverses.push(getSubtree(obj[child], id));
        } else if (child === "torbenClients") {
          resolve(null);
        }
      });

      Promise.all(childTraverses).then(c => {
        c.forEach(result => {
          if (result != null) {
            resolve(result);
          }
        });
      });
    }
  });
}