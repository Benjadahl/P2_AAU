export default function dijkstra (map, src) {
  const node1 = map.first(node => {
    if (node.model.torbenIDs != null) {
      return node.model.torbenIDs.includes(src);
    }
  });

  let Q = map.all();
  
  Q.forEach(node => {
    node.model.previous = null;
    node.model.dist = Number.MAX_SAFE_INTEGER;
  });

  node1.model.dist = 0;

  
  while (Q.length > 0) {
    Q = sortDist(Q);
    const u = Q.shift();

    if (u.parent != null) {
      visit(u, u.parent, u.model.rtt);
    }

    u.children.forEach(child => {
      visit(u, child, child.model.rtt);
    });
  }

  let toReturn = {};

  map.all().forEach(node => {
    if (node.model.torbenIDs != null) {
      node.model.torbenIDs.forEach(ID => {
        toReturn[ID] = node.model.dist;
      });
    }
  });

  return toReturn;
}

function sortDist (queue) {
  return queue.sort((a, b) => {
    const aDist = a.model.dist;
    const bDist = b.model.dist;

    if (aDist < bDist) {
      return -1;
    } else if (aDist > bDist) {
      return 1;
    } else {
      return 0;
    }
  });
}

function visit (src, trgt, rtt) {
  const rttF = rtt != null ? parseFloat(rtt) : 0;
  const alt = src.model.dist + rttF;
  if (alt < trgt.model.dist) {
    trgt.model.dist = alt;
    trgt.model.previous = src;
  }
}