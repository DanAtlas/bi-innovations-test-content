import type React from "react";

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      className={`
        px-4 py-2
        bg-white
        border border-solid border-blue-700
        text-blue-700 font-semibold tracking-wider
        hover:bg-blue-700 hover:text-white
      `}
      {...props}
    >
      {children}
    </button>
  )
};

export default Button;