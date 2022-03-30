import { FC } from "react";

export const Button: FC<JSX.IntrinsicElements["button"]> = ({
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`bg-white active:opacity-80 text-black py-1 px-4 font-medium ${props.className}`}
    >
      {children}
    </button>
  );
};
