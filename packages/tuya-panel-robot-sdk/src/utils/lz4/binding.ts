/* eslint-disable no-bitwise */
/**
	Javascript version of the key LZ4 C functions
 */

/**
 * Decode a block. Assumptions: input contains all sequences of a
 * chunk, output is large enough to receive the decoded data.
 * If the output buffer is too small, an error will be thrown.
 * If the returned value is negative, an error occured at the returned offset.
 *
 * @param input {Buffer} input data
 * @param output {Buffer} output data
 * @return {Number} number of decoded bytes
 * @private
 */
export function uncompress(input, output, sIdx?: number, eIdx?: number): number {
  const j = 0;
  const sIdxCur = sIdx || 0;
  const eIdxCur = eIdx || input.length - sIdxCur;
  // Process each sequence in the incoming data
  for (let i = sIdxCur, n = eIdxCur, j = 0; i < n; ) {
    const token = input[i++];

    // Literals
    let literalsLength = token >> 4;
    if (literalsLength > 0) {
      // length of literals
      let l = literalsLength + 240;
      while (l === 255) {
        l = input[i++];
        literalsLength += l;
      }

      // Copy the literals
      const end = i + literalsLength;
      // eslint-disable-next-line no-param-reassign
      while (i < end) output[j++] = input[i++];

      // End of buffer?
      if (i === n) return j;
    }

    // Match copy
    // 2 bytes offset (little endian)
    const offset = input[i++] | (input[i++] << 8);

    // 0 is an invalid offset value
    if (offset === 0 || offset > j) return -(i - 2);

    // length of match copy
    let matchLength = token & 0xf;
    let l = matchLength + 240;
    while (l === 255) {
      l = input[i++];
      matchLength += l;
    }

    // Copy the match
    let pos = j - offset; // position of the match copy in the current output
    const end = j + matchLength + 4; // minmatch = 4
    // eslint-disable-next-line no-param-reassign
    while (j < end) output[j++] = output[pos++];
  }

  return j;
}
