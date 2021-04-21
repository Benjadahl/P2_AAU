import Netmask from 'netmask';

/* 
  Input: IP (String) i.e: 212.10.45.200
  Output: Subnet mask (String) 212.10.45.0
*/

export default function getBase (ip) {
  const firstBit = parseInt(ip.split(".")[0]);
  let mask;

  if (firstBit < 128) {
    mask = 8;
  } else if (firstBit < 192) {
    mask = 16;
  } else if (firstBit < 256) {
    mask = 24;
  } else {
    throw 'Invalid IP';
  }

  return new Netmask.Netmask(ip + '/' + mask).base;
}