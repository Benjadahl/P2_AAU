/*
  weight map - using dijkstras algorithm from dijkstra.js
  in: traceroute map
  out: dictionary for path weights between torben IDs
*/

import dijkstra from './dijkstra.js';

export default function weightMap (map) {
  let wMap = {};
  let clients = [];

  map.all().forEach(node => {
    if (node.model.torbenIDs != null) {
      node.model.torbenIDs.forEach(ID => {
        wMap[ID] = dijkstra(map, ID);
      });
    }
  });

  return wMap;
}