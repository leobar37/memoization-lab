import { FC, ReactElement } from "react";

export const Display: FC<{ nav: ReactElement }> = ({ children, nav }) => (
  <div className="display">
    <div className="console ">
      <div>
        <h1 className="headline">Memoization</h1>
        <nav>{nav}</nav>
      </div>
      <div className="prints">{children}</div>
    </div>
  </div>
);
