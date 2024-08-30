/**
 * Byte Utilities
 * @module
 */

import { u8 } from "./shorthands.ts";

/** read d, starting at bit p and mask with m */
export const bits = (
  buffer: Uint8Array,
  p: number,
  bitMask: number,
): number => {
  const o = (p / 8) | 0;
  return ((buffer[o] | (buffer[o + 1] << 8)) >> (p & 7)) & bitMask;
};

/** starting at p, write the minimum number of bits that can hold v to d */
export const wbits = (d: Uint8Array, p: number, v: number): void => {
  v <<= p & 7;
  const o = (p / 8) | 0;
  d[o] |= v;
  d[o + 1] |= v >> 8;
};

/** starting at p, write the minimum number of bits (>8) that can hold v to d */
export const wbits16 = (buffer: Uint8Array, p: number, v: number): void => {
  v <<= p & 7;
  const o = (p / 8) | 0;
  buffer[o] |= v;
  buffer[o + 1] |= v >> 8;
  buffer[o + 2] |= v >> 16;
};

/** read d, starting at bit p continuing for at least 16 bits */
export const bits16 = (buffer: Uint8Array, p: number): number => {
  const o = (p / 8) | 0;
  return ((buffer[o] | (buffer[o + 1] << 8) | (buffer[o + 2] << 16)) >>
    (p & 7));
};

/** get end of byte
 *
 * `p` is thought of as the length of a data in bits. If you want to know how many bytes are needed to store that data, you can use this function.
 *
 * @example
 * ```ts
 * import { shft } from "./bytes.ts";
 *
 * // 9 bits of data will require 2 bytes to store
 * console.log(shft(9)) // 2
 * ```
 *
 * @param p - position
 * @returns end of byte
 */
export const shft = (p: number): number => ((p + 7) / 8) | 0;
// `| 0 ` is a common way to truncate a number to an integer in JavaScript.
// This is valid if -2^31 - 1 < p < 231
// Otherwise, you can use `Math.trunc(p)` instead.

export const concat = (a: Uint8Array, b: Uint8Array): Uint8Array => {
  const c = new u8(a.length + b.length);
  c.set(a);
  c.set(b, a.length);
  return c;
};
