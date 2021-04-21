import Netmask from 'netmask';

/* 
  Input: IP (String) i.e: 212.10.45.200
  Output: Subnet max (String) 212.10.45.0
*/

export default function sameNetwork (ip1, ip2) {
  const firstBit = parseInt(ip1.split(".")[0]);
  let mask;

  if (firstBit < 128) {
    mask = 8;
  } else if (firstBit < 192) {
    mask = 16;
  } else {
    mask = 24;
  }

  const block = new Netmask.Netmask(ip1 + '/' + mask);
  return block.contains(ip2);
}