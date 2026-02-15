
import React from "react";

export const Button = ({ children, className = "", ...props }) => (
  <button
    className={`bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition w-full ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
