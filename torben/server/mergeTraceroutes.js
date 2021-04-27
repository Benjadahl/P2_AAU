import TreeModel from 'tree-model';

export default function mergeTraceroutes (trX, trY) {
  let tree1 = new TreeModel();
  let root = tree1.parse({name: 'a', children: [{name: 'b'}]})
  let root2 = tree1.parse({name: 'a', children: [{name: 'c'}]})
  root.addChild(root2)
  
  
  root.walk([], node => {
    console.log(node.model.name);
  });
}