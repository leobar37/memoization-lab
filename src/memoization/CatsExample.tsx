import { Display, Button } from "@App/components";
import catsApi, { CatImage } from "@App/lib/catsApi";
import { FC, useEffect, useState, memo } from "react";

const CatDisplay: FC<{ cat: CatImage }> = ({ cat }) => {
  useEffect(() => {
    console.log("render");
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
  const [data, setData] = useState<CatImage[]>([]);

  useEffect(() => {
    (async () => {
      const cats = await catsApi.list({ limit }, true);
      setData(cats);
    })();
  }, [limit]);

  if (!data || data.length === 0) {
    return (
      <div>
        <h2 className="text-white text-lg">Loading Cats</h2>
      </div>
    );
  }

  return (
    <div className="w-full h-[80vh] flex-wrap overflow-y-scroll flex gap-3 my-6 flex-row justify-center">
      {data.map((cat) => (
        <CatDisplay key={cat.id} cat={cat} />
      ))}
    </div>
  );
};

const ListCatMemoized = memo(ListCats);

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
      <ListCats limit={10} />
      <h3 className="text-white font-medium text-center">List 2</h3>
      <ListCatMemoized limit={10 + count} />
    </>
  );
}

const MemoizedApp = memo(App);

export default MemoizedApp;
