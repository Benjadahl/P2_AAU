export default function mergeTraceroutes (trX, trY) {
  let yMatch;

  let xMatch = trX.first({strategy: 'post'}, nodeX => {
    return yMatch = trY.first({strategy: 'post'}, nodeY => {
      if (nodeX.model.ip === nodeY.model.ip) {
        return true;
      }
    });
  });

  console.log(yMatch.hasChildren());
  if (yMatch.hasChildren()) {
    xMatch.addChild(yMatch.children[0]);
  } else {
    xMatch.model.torbenIDs = xMatch.model.torbenIDs.concat(yMatch.model.torbenIDs);
  }

  return  trX;
}