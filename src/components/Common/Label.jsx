
import React from "react";

export const Label = ({ children, className = "" }) => (
  <label className={`block font-semibold text-gray-700 ${className}`}>{children}</label>
);

export default Label;
