/*
  get emit path - calculate the path to send a message via, using the weight map
  in: trace route map, recievers of the message (if empty send to all)
  out: an ideal path

       {
         torbenID1:
         {
           torbenID2: {
             torbenID3,
             torbenID4
           },
           torbenID5: {
             torbenID6
           }
         }
       }
*/

import weightMap from './weightMap.js';

export default function getEmitPath (map, sender, recievers) {
  return new Promise ((resolve, reject) => {
    const wMap = weightMap(map);
  
    let promises = [];
    let paths = [];
  
    if (recievers.length > 0) {
      recievers.forEach(reciever => {
        const newRecievers = recievers.filter(r => r !== reciever);
        const newSender = reciever;
        let recur = getEmitPath(map, newSender, newRecievers).then(recursion => {
          console.log(wMap[sender][reciever]);
          console.log(recursion);
          let path = {};
          path[reciever] = recursion.path;

          paths.push({
            weight: wMap[sender][reciever] + recursion.weight,
            path: path
          });
        });
        promises.push(recur);
      });
  
      Promise.all(promises).then(() => {
        console.log(paths);

        let minOption = null;

        for (let option of paths) {
          if (minOption == null || minOption.weight > option.weight ) {
            minOption = option;
          }
        }

        resolve(minOption);
      });
    } else {
      resolve({weight: 0, path: {}});
    }
  });
}