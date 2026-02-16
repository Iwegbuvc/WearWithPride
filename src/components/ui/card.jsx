export function CardHeader({ children, className = "" }) {
  return <div className={`p-4 border-b ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = "" }) {
  return <h2 className={`text-lg font-bold ${className}`}>{children}</h2>;
}
import React from "react";

export function Card({ children, className = "" }) {
  return <div className={`bg-white shadow rounded-lg ${className}`}>{children}</div>;
}

export function CardContent({ children, className = "" }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = "" }) {
  return <div className={`p-4 border-t ${className}`}>{children}</div>;
}
