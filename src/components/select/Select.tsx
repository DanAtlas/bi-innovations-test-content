import type React from "react";

type SelectProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

const Select: React.FC<SelectProps> = ({ children, ...props }) => {
  return (
    <select {...props} className="w-full px-4 py-2 border border-solid cursor-pointer">
      {children}
    </select>
  )
};

export default Select;