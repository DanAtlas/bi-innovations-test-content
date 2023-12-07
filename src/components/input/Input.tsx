import type React from "react";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.FC<InputProps> = ({ ...props }) => {
  return (
    <input
      className="w-full px-4 py-2 border border-solid rounded hover:bg-gray-100 outline-none"
      {...props}
    />
  )
};

export default Input;