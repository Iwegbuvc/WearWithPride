import React from "react";

export const Avatar = ({ children, className = "" }) => (
  <div className={`rounded-full bg-gray-200 flex items-center justify-center ${className}`}>{children}</div>
);

export const AvatarFallback = ({ children, className = "" }) => (
  <span className={`text-black font-bold ${className}`}>{children}</span>
);
