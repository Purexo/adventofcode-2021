import {open} from 'node:fs/promises';

const fh = await open(new URL('../fixtures/01.txt', import.meta.url))

let previousValue;
let measureLGTprevious = 0;
for await (const line of fh.readLines()) {
  const value = Number(line);

  if (typeof previousValue === 'undefined') {
    previousValue = value;
    continue;
  }

  if (value > previousValue) measureLGTprevious++;
  previousValue = value;
}

console.log(measureLGTprevious);
