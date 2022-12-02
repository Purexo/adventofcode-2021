import {open} from 'node:fs/promises';

const fh = await open(new URL('../fixtures/03.txt', import.meta.url));

const BYTES_MASK = [
  0b100000000000,
  0b010000000000,
  0b001000000000,
  0b000100000000,
  0b000010000000,
  0b000001000000,
  0b000000100000,
  0b000000010000,
  0b000000001000,
  0b000000000100,
  0b000000000010,
  0b000000000001,
]

let bits_1 = [];
let bits_0 = [];

let oxygen_ratings;
let co2_ratings;

let iteration = firstIteration;

for (const mask of BYTES_MASK) {
  await iteration(mask);

  if (oxygenIteration === noop && co2Iteration === noop) break;
}

const [[oxygen_rating], [co2_rating]] = [oxygen_ratings, co2_ratings]

console.log({oxygen_rating, co2_rating, result: oxygen_rating * co2_rating});

function noop() {}
async function firstIteration(mask) {
  for await (const line of fh.readLines()) {
    const value = parseInt(line, 2);

    if (mask & value) bits_1.push(value);
    else bits_0.push(value);
  }

  oxygen_ratings = bits_1.length >= bits_0.length ? bits_1 : bits_0;
  co2_ratings = bits_0.length <= bits_1.length ? bits_0 : bits_1;

  iteration = nextIterations;
}

function nextIterations(mask) {
  oxygenIteration(mask);
  co2Iteration(mask);
}

function oxygenIteration(mask) {
  bits_1 = [];
  bits_0 = [];

  for (const value of oxygen_ratings) {
    if (mask & value) bits_1.push(value);
    else bits_0.push(value);
  }

  oxygen_ratings = bits_1.length >= bits_0.length ? bits_1 : bits_0;
  if (oxygen_ratings.length === 1) oxygenIteration = noop;
}

function co2Iteration(mask) {
  bits_1 = [];
  bits_0 = [];

  for (const value of co2_ratings) {
    if (mask & value) bits_1.push(value);
    else bits_0.push(value);
  }

  co2_ratings = bits_0.length <= bits_1.length ? bits_0 : bits_1;
  if (co2_ratings.length === 1) co2Iteration = noop;
}