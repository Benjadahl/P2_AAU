import getClientsInTree from "./getClientsInTree.js";
import getEmitPath from "./getEmitPath.js";
import pathToArray from "./pathToArray.js";
import weightSort from "./weightSort.js";

export default function getChain (map) {
  return new Promise ((resolve, reject) => {
    const all = getClientsInTree(map);
    let pathCalculations = [];
    
    for (let i = 0; i < all.length; i++) {
      const sender = all[i];
      const recievers = all.filter(ID => ID !== sender);
      
      pathCalculations.push(getEmitPath(map, sender, recievers));
    }

    Promise.all(pathCalculations).then(emitPaths => {
      emitPaths.sort(weightSort);
      console.log(emitPaths);
      const emitPath = emitPaths[0];
      let chain = [emitPath.sender];
      
      resolve(chain.concat(pathToArray(emitPath.path)));
    });
  });
}