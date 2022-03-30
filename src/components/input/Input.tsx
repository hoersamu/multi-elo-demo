import classNames from "classnames";
import { FC, InputHTMLAttributes, RefObject } from "react";

export const Input: FC<
  InputHTMLAttributes<HTMLInputElement> & {
    inputRef?: RefObject<HTMLInputElement>;
  }
> = ({ className, inputRef, ...props }) => (
  <input
    ref={inputRef}
    className={classNames("bg-e-2 h-8 rounded-lg px-2", className)}
    {...props}
  />
);
