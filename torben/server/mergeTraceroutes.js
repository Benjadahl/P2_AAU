export default function mergeTraceroutes (trX, trY) {
  
  trX.walk([], node => {
    console.log(node.model.ip);
  });
}