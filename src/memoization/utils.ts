type AnyFunction = (...args: any[]) => any;

export const memoize = <T extends AnyFunction>(fn: T): T => {
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
