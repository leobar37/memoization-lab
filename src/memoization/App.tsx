import { Display } from "@App/components";
import Factorial from "./Factorial";
import Cats from "./CatsExample";
import Cats2 from "./CatsExample2";
import { MouseEventHandler, useState } from "react";
const examples = {
  factorial: Factorial,
  cats: Cats,
  "cats-2": Cats2,
};

type Examples = keyof typeof examples;

const App = () => {
  const [example, setExample] = useState<Examples>("cats");
  const Example = examples[example];
  const handleClick: MouseEventHandler<HTMLLIElement> = (e) => {
    const example = (e.target as HTMLLIElement).dataset.example;
    setExample(example as Examples);
  };
  return (
    <Display
      nav={
        <ul className="flex text-white gap-x-4 my-3">
          {Object.keys(examples).map((key) => (
            <li
              className="hover:underline cursor-pointer"
              key={key}
              onClick={handleClick}
              data-example={key}
            >
              {key}
            </li>
          ))}
        </ul>
      }
    >
      <Example />
    </Display>
  );
};

export default App;
