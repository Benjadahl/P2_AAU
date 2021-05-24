export default function getClientsInTree (map) {
  let clients = [];
  
  map.all(node => node.model.torbenIDs != null).forEach(node => {
    clients = clients.concat(node.model.torbenIDs);
  });
  
  return clients;
}