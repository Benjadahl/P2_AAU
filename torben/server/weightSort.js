export default function weightSort (a, b) {
  if (a.weight < b.weight) {
    return -1;
  } else if (a.weight > b.weight) {
    return 1;
  } else {
    return 0;
  }
}