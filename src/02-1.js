import {open} from 'node:fs/promises';

const fh = await open(new URL('../fixtures/02.txt', import.meta.url))

let horizontal_position = 0;
let deep_position = 0;

const strategies = {
  forward(v) {
    horizontal_position += v;
  },
  down(v) {
    deep_position += v;
  },
  up(v) {
    deep_position -= v;
  },
}

for await (const line of fh.readLines()) {
  const [direction, _value] = line.trim().split(' ').map(s => s.trim());
  const value = Number(_value);

  strategies[direction](value);
}

// 1459206
console.log(horizontal_position * deep_position);
