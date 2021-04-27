export default function mergeTraceroutes (trX, trY) {
  let yMatch;

  let xMatch = trX.first({strategy: 'post'}, nodeX => {
    return yMatch = trY.first({strategy: 'post'}, nodeY => {
      if (nodeX.model.ip === nodeY.model.ip) {
        return true;
      }
    });
  });

  xMatch.addChild(yMatch.children[0]);

  console.log(JSON.stringify(trX.model, null, 2));
}