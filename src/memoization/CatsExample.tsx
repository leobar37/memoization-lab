import { Button } from "@App/components";
import catsApi, { CatImage } from "@App/lib/catsApi";
import { FC, useEffect, useState, memo } from "react";

const CatDisplay: FC<{ cat: CatImage }> = ({ cat }) => {
  useEffect(() => {
    console.log("Render");
  });

  return (
    <div>
      <img
        src={cat.url}
        className="overflow-hidden  max-w-[350px] object-contain"
        alt=""
      />
    </div>
  );
};

const ListCats: FC<{ limit: number }> = ({ limit }) => {
  const [cats, setCats] = useState<CatImage[]>([]);

  useEffect(() => {
    (async () => {
      const catsData = await catsApi.list();
      setCats(catsData);
    })();
  }, []);

  return (
    <div className="w-full h-[80vh] flex-wrap overflow-y-scroll flex gap-3 my-6 flex-row justify-center">
      {cats.map((cat) => (
        <CatDisplay cat={cat} key={cat.id} />
      ))}
    </div>
  );
};

const ListCatsMemoized = memo(ListCats);

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <Button
        onClick={() => {
          console.log("click");
          setCount(count + 1);
        }}
      >
        Click me {count}
      </Button>

      <h3 className="text-white font-medium text-center">List 2</h3>
      <ListCatsMemoized limit={10} />
    </>
  );
}

export default App;
