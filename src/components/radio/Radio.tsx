import type React from "react";

interface RadioProps {
  text: string
  active: boolean
  onChange: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
};

const Radio: React.FC<RadioProps> = ({ text, active, onChange }) => {
  return (
    <div
      className={
        `
        mr-4 py-2
        font-semibold tracking-wider 
        hover:text-blue-700
        cursor-pointer
        ` + (active ? " text-blue-700 font-bold underline" : " text-gray-800")
      }
      onClick={onChange}
    >
      {text}
    </div>
  )
};

export default Radio;