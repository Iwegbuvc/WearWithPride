import React from "react";

const Badge = ({ children, className = "" }) => (
  <span
    className={`inline-block px-3 py-1 text-xs font-bold rounded ${className}`}
  >
    {children}
  </span>
);

export default Badge;
