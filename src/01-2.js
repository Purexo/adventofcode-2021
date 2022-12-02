import {open} from 'node:fs/promises';

const fh = await open(new URL('../fixtures/01.txt', import.meta.url))

let windowLGTprevious = 0;
let lastWindowV;
const pending_windows = [];

for await (const line of fh.readLines()) {
  const value = Number(line);

  const first_w = pending_windows[0];
  const second_w = pending_windows[1];
  const third_w = pending_windows[2];

  if (first_w?.length < 3) first_w.push(value);
  if (second_w?.length < 3) second_w.push(value);
  if (third_w?.length < 3) third_w.push(value);

  if (first_w?.length === 3) {
    const first_v = first_w.reduce((acc, v) => acc + v, 0);

    if (typeof lastWindowV !== "undefined" && first_v > lastWindowV) windowLGTprevious++;

    lastWindowV = first_v;
    pending_windows.splice(0, 1);
  }

  pending_windows.push([value]);
}

// 1518
console.log(windowLGTprevious);
