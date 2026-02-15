import React from "react";

export function Sheet({ open, onOpenChange, children }) {
  return (
    <div
      className={`fixed inset-0 z-50 flex transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
    >
      <div className="fixed inset-0 bg-black/30" onClick={() => onOpenChange(false)} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function SheetContent({ side = "left", className = "", children, open }) {
  // Slide in from left or right
  const base = side === "left"
    ? open
      ? "translate-x-0"
      : "-translate-x-full"
    : open
      ? "translate-x-0"
      : "translate-x-full";
  // Extract width from className if present, otherwise fallback to 256px
  const widthMatch = className.match(/w-\[(\d+)px\]/);
  const width = widthMatch ? parseInt(widthMatch[1], 10) : 256;
  return (
    <aside
      className={`fixed top-0 ${side === "left" ? "left-0" : "right-0"} h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${base} ${className}`}
      style={{ width }}
    >
      {children}
    </aside>
  );
}

export function SheetHeader({ className = "", children }) {
  return <div className={`border-b p-4 ${className}`}>{children}</div>;
}

export function SheetTitle({ className = "", children }) {
  return <h2 className={`text-lg font-bold ${className}`}>{children}</h2>;
}
