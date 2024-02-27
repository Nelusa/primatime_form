import {ReactNode} from "react";
import classNames from "../utils/classNames.ts";

interface ButtonProps {
  children?: ReactNode;
  type?: "submit" | "button";
  className?: string;
}

const Button = ({ children, type = "button", className }: ButtonProps) => {
  return (
    <button type={type}
            className={classNames("bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg", className)}>
      {children}
    </button>
  )
}

export default Button;