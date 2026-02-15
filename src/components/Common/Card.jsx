
import React from "react";

export const Card = ({ children, className = "", ...props }) => (
  <div
    className={`bg-white rounded-xl shadow p-4 flex flex-col items-center justify-center ${className}`}
    {...props}
  >
    {children}
  </div>
);

export default Card;
