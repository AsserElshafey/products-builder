import { ReactNode, ButtonHTMLAttributes } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  width?: "w-full" | "w-fit";
}

const Button = ({ children, className, width = "w-full", ...rest }: IProps) => {
  return (
    <button
      className={`${className} ${width} text-white rounded-md p-2 mt-2 cursor-pointer transition-all duration-300 ease-in-out`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
