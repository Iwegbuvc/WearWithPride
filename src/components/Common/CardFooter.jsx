import React from "react";

const CardFooter = ({ children, className = "" }) => (
  <div className={`w-full border-t pt-4 mt-2 ${className}`}>{children}</div>
);

export default CardFooter;
