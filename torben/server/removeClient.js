export default function removeClient (map, torbenID) {
  map.all(node => node.model.torbenIDs != null).forEach(node => {
    const index = node.model.torbenIDs.indexOf(torbenID);

    if (index != -1) {
      node.model.torbenIDs.splice(index, 1);
    }
  });

  return map;
}