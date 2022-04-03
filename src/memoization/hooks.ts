import { useState } from "react";
export const useCounter = () => {
  const [count, setCount] = useState(0);
  const increment = () => setCount((count) => count + 1);
  const decrement = () => setCount((count) => count - 1);
  const reset = () => setCount(0);
  return { count, increment, decrement, reset } as const;
};

export const useForceUpdate = () => {
  const [, setCounter] = useState<number>(0);
  const forceUpdate = () => setCounter((counter) => counter + 1);
  return forceUpdate;
};
