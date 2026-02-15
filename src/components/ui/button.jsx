import React from "react";

export function Button({ children, onClick, className = "", ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
