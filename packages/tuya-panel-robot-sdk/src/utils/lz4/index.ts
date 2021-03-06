import { uncompress as uncompressSize } from './binding';

const { Buffer } = require('buffer');

function uncompress(bytes: string, size = 1024 * 1024): string {
  const input = Buffer.from(bytes);
  let uncompressed = Buffer.alloc(size);
  const uncompressedSize = uncompressSize(input, uncompressed);
  uncompressed = uncompressed.slice(0, uncompressedSize);
  return uncompressed;
}

// const data = `46 00 00 07 ff 01 00 29 f4 00 01 00 19 04 0e 00 03 02 00 16 01 2f 00 23 ff fd 14 00 03 02 00 13 01 08 00 0a 02 00 17 7f 31 00 16 40 1b 00 50 00 00 00 00 40`
//   .split(' ')
//   .map(d => parseInt(d, 16));

// const res = uncompress(data);

// debugger;

export default {
  uncompress,
};
