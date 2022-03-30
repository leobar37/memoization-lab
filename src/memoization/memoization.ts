let count = 0;
import * as utils from "../utils/Vanilla";

import { init } from "../utils/Vanilla";
init();

const cache: any = {};

const printExample = (label: string, fn: any) => {
  count = 0;
  const values = [100, 50, 30];
  values.forEach((val) => fn(val));
  utils.log(`${label} -> computations: ${count}`);
};

const factorial = (n: number): number => {
  if (n == 0) {
    return 1;
  }
  const result = factorial(n - 1) * n;
  count++;
  return result;
};

printExample("Not memoized", factorial);

const memoizeFactorial = (n: number): number => {
  if (n in cache) {
    return cache[n];
  }
  if (n == 0) {
    cache[n] = 1;
    return 1;
  }
  cache[n] = memoizeFactorial(n - 1) * n;
  count++;
  return cache[n];
};

printExample("Memoized-1", memoizeFactorial);

type AnyFunction = (...args: any[]) => any;

const memoize = <T extends AnyFunction>(fn: T): T => {
  const cache = new Map<String, any>();
  return ((...args: any[]) => {
    const argskey = JSON.stringify(args);
    if (cache.has(argskey)) {
      return cache.get(argskey);
    }
    const result = fn(...args);
    cache.set(argskey, result);
    return result;
  }) as unknown as T;
};

const newFactorial = memoize((n) => {
  if (n == 0) {
    return 1;
  }
  const result = n * newFactorial(n - 1);
  count++;
  return result;
});

printExample("memoized-2", newFactorial);
