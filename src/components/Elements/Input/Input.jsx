import { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
  const { type = "text", placeholder = " ", classname = " ", ...propss } = props;
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-400 ${classname}`}
      ref={ref}
      {...propss}
    />
  );
});

export default Input;
