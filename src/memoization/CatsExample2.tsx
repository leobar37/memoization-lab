import { Display, Button } from "@App/components";
import catsApi, { CatImage, CatImageWithName } from "@App/lib/catsApi";
import { FC, useEffect, useState, memo, useCallback, useMemo } from "react";
import { unstable_batchedUpdates } from "react-dom";
const CatDisplay: FC<{
  cat: CatImageWithName;
  deleteACat: (id: string) => void;
}> = ({ cat, deleteACat }) => {
  useEffect(() => {
    console.log("Render");
  });
  return (
    <div className="flex flex-col">
      <img
        src={cat.url}
        className="overflow-hidden  max-w-[350px] object-contain"
        alt=""
      />
      <h2 className="text-center py-2  text-white font-medium">{cat.name}</h2>
      <Button onClick={() => deleteACat(cat.id)}>Delete</Button>
    </div>
  );
};

const CatDisplayMemoized = memo(CatDisplay);

const transformCats = (cats: CatImage[]): CatImageWithName[] => {
  console.log("transform");
  return cats.map((cat, idx) => {
    return {
      ...cat,
      name: `cat #${idx} `,
    };
  }) as CatImageWithName[];
};

const ListCats: FC<{ limit: number; loadMore: () => void }> = ({
  limit,
  loadMore,
}) => {
  const [data, setData] = useState<CatImage[]>([]);

  const newCats = useMemo(() => transformCats(data), [data]);

  useEffect(() => {
    console.log("list render");
  });

  useEffect(() => {
    (async () => {
      const cats = await catsApi.list({ limit }, true);
      setData(cats);
    })();
  }, [limit]);

  const deleteCat = useCallback((id: string) => {
    const newCats = catsApi.deleteACat(id);
    setData(newCats);
  }, []);

  if (!data || data.length === 0) {
    return (
      <div>
        <h2 className="text-white text-lg">Loading Cats</h2>
      </div>
    );
  }

  return (
    <>
      <span className="text-white px-5">cats : {data.length}</span>
      <Button onClick={loadMore}>load more</Button>
      <div className="w-full h-[80vh] flex-wrap overflow-y-scroll flex gap-3 my-6 flex-row justify-center">
        {newCats.map((cat) => (
          <CatDisplayMemoized deleteACat={deleteCat} key={cat.id} cat={cat} />
        ))}
      </div>
    </>
  );
};

const ListMemoized = memo(ListCats);

function App() {
  const [count, setCount] = useState(0);
  const [limit, setLimit] = useState(10);

  const loadMore = useCallback(() => {
    console.log("load more");
    setLimit((limit) => limit + 10);
  }, []);

  return (
    <>
      <Button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Click me {count}
      </Button>
      <ListMemoized loadMore={loadMore} limit={limit} />
    </>
  );
}

const MemoizedApp = memo(App);

export default MemoizedApp;
