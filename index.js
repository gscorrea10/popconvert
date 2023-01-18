const input = require("readline-sync");

class SomeObject {
  constructor() {
    this.results = [];
  }
  register(callback, result) {
    this.results.push([callback, result]);
  }
}

async function f1(A, B) {
  const value = input.questionInt("Enter a number: ");
  A.register(f1, value);
  return value;
}

async function f2(A, B) {
  const value = input.questionInt("Enter a number: ");
  B.register(f2, value);
  return value;
}

async function f3(A, B) {
  const value = input.questionInt("Enter a number: ");
  A.register(f3, value);
  return value;
}

async function main(minimum, callbackDelayPairs, A, B) {
  let all = [];
  for (let i = 0; i < callbackDelayPairs.length; i++) {
    let pair = callbackDelayPairs[i];
    let callback = pair[0];
    let delay = pair[1];
    let x = await callback(A, B);
    all.push([callback, x]);
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  all.sort((a, b) => b[1] - a[1]);
  let filtered = all.filter((pair) => pair[1] >= minimum);
  return { all, filtered };
}

async function example() {
  const minimum = input.questionInt("Enter a minimum number: ");

  const delay1 = input.questionInt("Enter a delay: ");
  const delay2 = input.questionInt("Enter a delay: ");
  const delay3 = input.questionInt("Enter a delay: ");

  const callbackDelayPairs = [
    [f1, delay1],
    [f2, delay2],
    [f3, delay3],
  ];

  let A = new SomeObject();
  let B = new SomeObject();
  let result = await main(minimum, callbackDelayPairs, A, B);
  console.log(result);
}

example();
