export default function pathToArray (path) {
  let toReturn = [];

  while (Object.keys(path).length > 0) {
    let ID = Object.keys(path)[0];
    toReturn.push(ID);
    path = path[ID]; 
  }

  return toReturn;
}