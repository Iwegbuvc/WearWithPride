import { AlignJustify, LogOut } from "lucide-react";
import React from "react";


const Adminheader = ({ setOpen }) => {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white shadow">
      <button
        className="lg:hidden sm:block"
        onClick={() => setOpen && setOpen(true)}
        type="button"
      >
        <AlignJustify />
        <span className="sr-only">Toggle menu</span>
      </button>
      <div className="flex flex-1 justify-end">
        <button className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow">
          <LogOut />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Adminheader;
