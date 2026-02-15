// src/components/Common/CardContent.jsx
import React from "react";

const CardContent = ({ children, className = "" }) => (
  <div className={`w-full ${className}`}>{children}</div>
);

export default CardContent;
