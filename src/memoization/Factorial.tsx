import { ChangeEventHandler, FC, useState, useMemo, useEffect } from "react";
import { Button, Display } from "@App/components";

const factorial = (n: number): number => {
  console.log("factorial ->", n);
  return n <= 1 ? 1 : n * factorial(n - 1);
};

export type AppProps = {};

const useForceUpdate = () => {
  const [update, setUpdate] = useState(0);
  const forceUpdate = () => setUpdate((update) => update + 1);

  return [update, forceUpdate] as const;
};

const FactorialExample: FC<AppProps> = ({}) => {
  const [num, setNum] = useState(0);
  const [resultFactorial, setFactorial] = useState<number>(0);
  // const resultFactorial = useMemo(() => factorial(num), [num]);
  const [update, forceUpdate] = useForceUpdate();
  useEffect(() => {
    console.log("update");
    const result = factorial(num as number);
    setFactorial(result);
  }, [num]);
  const onChangue: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    if (value.trim() != "" && Number(value) !== NaN) {
      setNum(parseInt(value));
    }
  };

  return (
    <>
      <div className="flex flex-col gap-y-3 max-w-sm mx-auto mt-7">
        <h1 className="text-white text-center text-3xl my-2">
          {num}={resultFactorial}
        </h1>
        <input
          type="text"
          onChange={onChangue}
          placeholder="factorial"
          className="border-none p-1"
        />
        <Button onClick={() => forceUpdate()}>re-render</Button>
      </div>
    </>
  );
};

export default FactorialExample;
