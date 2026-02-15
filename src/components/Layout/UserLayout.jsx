import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import Menu from "./Menu";

import { Outlet } from "react-router-dom";
import CartDrawer from "../Cart/CartDrawer";
import Footer from "../Common/Footer";
import { useState } from "react";

const UserLayout = () => {
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const toggleCartDrawer = () => setCartDrawerOpen((v) => !v);

  return (
    <>
      <Menu onCartClick={toggleCartDrawer} />
      <CartDrawer
        drawerOpen={cartDrawerOpen}
        toggleCartDrawer={toggleCartDrawer}
      />
      <main className="pt-20 bg-white min-h-screen text-black">
        <Outlet />
        <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      </main>
      <Footer />
    </>
  );
};

export default UserLayout;
