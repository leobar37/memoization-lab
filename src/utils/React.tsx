import { FC } from "react";
export const Log: FC<{ children: any[] | any }> = ({ children }) => {
  return (
    <pre className="line">
      <code>
        {JSON.stringify(
          Array.isArray(children) ? children.join(" ") : children
        )}
      </code>
    </pre>
  );
};
