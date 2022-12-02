import {open} from 'node:fs/promises';

const fh = await open(new URL('../fixtures/03.txt', import.meta.url))

// array of entries [count-0, count-1]
let bytes_synthesis;
for await (const line of fh.readLines()) {
  if (!bytes_synthesis) bytes_synthesis = Array.from(Array(line.length), () => [0, 0]);

  let i = 0;
  for (const char of line) {
    const bytes_entry = bytes_synthesis[i];

    const byte = Number(char); // 0 or 1
    bytes_entry[byte]++;

    i++;
  }
}

let gamma = '0b', epsilon = '0b';
for (const [bs0, bs1] of bytes_synthesis) {
  if (bs0 > bs1) {
    gamma += '0';
    epsilon += '1';
  }
  else {
    gamma += '1';
    epsilon += '0';
  }
}

// 3813416
console.log(Number(gamma) * Number(epsilon));
