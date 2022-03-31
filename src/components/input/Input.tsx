import classNames from "classnames";
import { forwardRef, InputHTMLAttributes } from "react";

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={classNames(
      className,
      "bg-e-2 h-8 rounded-lg px-2 border border-bg"
    )}
    {...props}
  />
));
