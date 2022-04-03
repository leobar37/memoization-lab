import { Button } from "@App/components";
import { ChangeEventHandler, FC, useState, useMemo } from "react";
import { useCounter } from "./hooks";
import { memoize } from "./utils";
const factorial = memoize((n: number): number => {
  console.log("factorial ->", n);
  return n <= 1 ? 1 : n * factorial(n - 1);
});

export type AppProps = {};

const FactorialExample: FC<AppProps> = ({}) => {
  const [num, setNum] = useState(0);

  const resultFactorial = useMemo(() => factorial(num), [num]);

  const { count, increment, decrement, reset } = useCounter();

  const onChangue: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    if (value.trim() !== "" && Number(value)) {
      setNum(parseInt(value));
    }
  };

  return (
    <>
      <div className="flex flex-col gap-y-3 max-w-sm mx-auto mt-7">
        <h1 className="text-white text-center text-3xl my-2">
          {num}={resultFactorial}
        </h1>
        <h1 className="text-white text-center text-3xl my-2">
          {`counted: ${count}`}
        </h1>
        <input
          type="text"
          onChange={onChangue}
          placeholder="factorial"
          className="border-none p-1"
        />
        <div className="flex">
          <Button onClick={decrement}>-</Button>
          <Button onClick={reset}>Reset</Button>
          <Button onClick={increment}>+</Button>
        </div>
      </div>
    </>
  );
};

export default FactorialExample;
