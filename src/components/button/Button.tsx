import classNames from "classnames";
import { ButtonHTMLAttributes, FC } from "react";

type ButtonProps = {
  primary?: boolean;
};

export const Button: FC<
  ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps
> = ({ primary, children, className, ...props }) => (
  <button
    className={classNames("flex p-2 rounded-lg", className, {
      "hover:shadow-elevation-2": !props.disabled,
      "hover:bg-btn-hover": !props.disabled && !primary,
      "bg-accent": primary,
    })}
    {...props}
  >
    {children}
  </button>
);
