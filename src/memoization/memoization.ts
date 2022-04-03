let count = 0;
import * as utils from "../utils/Vanilla";

import { init } from "../utils/Vanilla";

init();

const printExample = (label: string, fn: any) => {
  count = 0;
  const values = [100, 50, 30, 101];
  values.forEach((val) => fn(val));
  utils.log(`${label} -> computations: ${count}`);
};

const factorial = (n: number) => {
  if (n == 0) {
    return 1;
  }
  const result = factorial(n - 1) * n;
  count++;
  return result;
};

printExample("Not memoized", factorial);

let cache = {};

const memoizedFactorial = (n: number) => {
  if (n in cache) {
    return cache[n];
  }
  if (n == 0) {
    return 1;
  }
  const result = memoizedFactorial(n - 1) * n;
  cache[n] = result;
  count++;
  return result;
};

printExample("Memoized-1", memoizedFactorial);

const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

const newFactorial = memoize((n) => {
  if (n == 0) {
    return 1;
  }
  const result = newFactorial(n - 1) * n;
  count++;
  return result;
});

printExample("memoized-2", newFactorial);

const sum = (a: number, b: number) => {
  console.log("sum called");

  return a + b;
};

const memoizedSum = memoize(sum);

const sum_4 = memoizedSum(2, 2);
const sum1_4 = memoizedSum(2, 2);
const sum2_4 = memoizedSum(2, 2);
const sum3_4 = memoizedSum(2, 2);
const sum4_4 = memoizedSum(2, 2);
const sum5_4 = memoizedSum(2, 2);
const sum6_4 = memoizedSum(2, 2);

utils.log("sum  2 + 2-> ", sum_4);
