import getClientsInTree from "./getClientsInTree.js";
import getEmitPath from "./getEmitPath.js";
import pathToArray from "./pathToArray.js";

export default function getChain (map) {
  return new Promise ((resolve, reject) => {
    const all = getClientsInTree(map);
    const sender = all[0];
    const recievers = all.slice(1);

    getEmitPath(map, sender, recievers).then(emitPath => {
      //Indsæt kode der finder den laveste vægt
  
      let chain = [sender];
  
      resolve(chain.concat(pathToArray(emitPath.path)));
    });


  });
}