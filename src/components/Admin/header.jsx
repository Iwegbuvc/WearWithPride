
import { AlignJustify, LogOut } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../ui/use-toast";
import { logout as logoutApi } from "../../api/auth";



const Adminheader = ({ setOpen }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch (err) {
      // Ignore error, proceed to clear tokens and redirect
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
      variant: "success",
    });
    navigate("/login");
  };

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
        <button
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow cursor-pointer"
          onClick={handleLogout}
        >
          <LogOut />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Adminheader;
