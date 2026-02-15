import { IoMdClose } from "react-icons/io";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import "./cart-drawer.css";
import CartContent from "./CartContent";

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();

  const handleCheckOut = () => {
    toggleCartDrawer();
    navigate("/checkout");
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 backdrop-blur-sm ${
          drawerOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleCartDrawer}
      />

      {/* Drawer Panel */}
      <aside
        className={`fixed top-0 right-0 h-full bg-white shadow-2xl transform transition-transform duration-500 ease-in-out flex flex-col z-50
          w-full max-w-[95vw] sm:max-w-[75vw] md:max-w-[40vw] lg:max-w-[33vw]
          ${drawerOpen ? "translate-x-0" : "translate-x-full"}
        `}
        style={{ overflow: "hidden", background: "#fff" }}
        aria-label="Cart Drawer"
      >
        {/* Header with title and close button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white sticky top-0 z-10">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Shopping Cart
          </h2>
          <button
            onClick={toggleCartDrawer}
            className="cursor-pointer hover:bg-gray-100 rounded-full p-2 transition"
            aria-label="Close cart drawer"
          >
            <IoMdClose className="h-7 w-7 text-gray-700" />
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex-grow overflow-y-auto px-4 sm:px-6 pb-4 custom-scrollbar bg-white">
          <CartContent />
        </div>

        {/* Checkout Button */}
        <div className="p-4 border-t border-gray-200 bg-white sticky bottom-0 left-0 right-0 z-20">
          <button
            onClick={handleCheckOut}
            className="w-full cursor-pointer bg-red-600 text-white py-3 rounded-lg shadow-lg font-bold text-lg hover:bg-red-700 transition-opacity tracking-wide"
          >
            Checkout
          </button>
          {/* <p className="text-xs tracking-tight text-gray-500 mt-2 text-center">
            Shipping, taxes, and delivery charges will be calculated at
            checkout.
          </p> */}
        </div>
      </aside>
    </>
  );
};

CartDrawer.propTypes = {
  drawerOpen: PropTypes.bool.isRequired,
  toggleCartDrawer: PropTypes.func.isRequired,
};

export default CartDrawer;
