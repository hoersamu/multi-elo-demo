import classNames from "classnames";
import { ButtonHTMLAttributes, FC } from "react";

export const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...props
}) => (
  <button
    className={classNames("flex p-2 rounded-lg", className, {
      "hover:shadow-elevation-2 hover:bg-btn-hover": !props.disabled,
    })}
    {...props}
  >
    {children}
  </button>
);
