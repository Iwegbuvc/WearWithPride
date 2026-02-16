import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import BrowseCategories from "../Common/BrowseCategories";
import logo from "../../assets/logoGold.jpg";

const menuItems = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "My Orders", path: "/orders" },
  {
    name: "Category",
    submenu: [
      { name: "Combo", path: "/category/combo" },
      { name: "Shorts/Trousers", path: "/category/shorts-trousers" },
      { name: "T-shirts", path: "/category/tshirts" },
      { name: "Accessories", path: "/category/accessories" },
      { name: "Shoes", path: "/category/shoes" },
    ],
  },
];

const Menu = ({ onCartClick }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-white z-50 shadow">
      <nav className="flex flex-wrap items-center justify-between px-2 sm:px-4 md:px-8 lg:px-12 py-3 gap-y-2">
        <div className="flex items-center gap-2 md:gap-4 lg:gap-6 justify-center min-w-0">
          <img
            src={logo}
            alt="Logo"
            className="h-14 w-14 rounded-full object-cover"
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <span className="font-extrabold text-base md:text-lg lg:text-xl xl:text-2xl text-black">
            WearWithPride
          </span>
        </div>
        <ul className="hidden lg:flex items-center gap-4 justify-center flex-nowrap min-w-0">
          {/* Hamburger is handled below for sm/md */}
          {menuItems.map((item) =>
            !item.submenu ? (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `px-2 md:px-2 py-1 rounded transition-colors duration-200 text-black font-bold text-xs md:text-sm lg:text-base xl:text-lg no-underline whitespace-nowrap ${
                      isActive ? "text-red-600" : "hover:text-red-500"
                    }`
                  }
                  end
                >
                  {item.name}
                </NavLink>
              </li>
            ) : (
              <li className="relative" key={item.name}>
                <button
                  className="px-2 md:px-2 py-1 rounded cursor-pointer text-black font-bold text-xs md:text-sm lg:text-base xl:text-lg flex items-center hover:text-red-500 focus:outline-none no-underline"
                  onClick={() => setCategoryOpen((v) => !v)}
                  aria-expanded={categoryOpen}
                  aria-controls="desktop-category-menu"
                  type="button"
                >
                  {item.name}
                  <svg
                    className={`ml-1 transition-transform duration-200 ${categoryOpen ? "rotate-180" : "rotate-0"}`}
                    width="18"
                    height="18"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      d="M6 9l6 6 6-6"
                    />
                  </svg>
                </button>
                {categoryOpen && (
                  <ul
                    id="desktop-category-menu"
                    className="absolute left-0 mt-3 w-56 md:w-60 bg-white border border-gray-200 rounded-xl shadow-2xl p-3 flex flex-col gap-2 z-40 animate-fade-in"
                  >
                    {item.submenu.map((sub) => (
                      <li key={sub.name}>
                        <NavLink
                          to={sub.path}
                          className={({ isActive }) =>
                            `block px-4 md:px-5 py-2 md:py-3 rounded-lg text-black font-bold text-xs md:text-sm lg:text-base xl:text-lg bg-gray-50 hover:bg-red-100 hover:text-red-600 shadow-sm transition no-underline ${
                              isActive
                                ? "text-red-600 bg-red-50 font-extrabold"
                                : ""
                            }`
                          }
                          onClick={() => setCategoryOpen(false)}
                        >
                          {sub.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ),
          )}
          {/* End desktop nav list */}
        </ul>
        {/* Desktop icons */}
        <div className="hidden lg:flex items-center gap-4 min-w-0">
          {/* Search */}
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-200"
            />
            <FiSearch className="absolute right-2 top-2 text-gray-400" />
          </div>
          <div className="relative group">
            <Link to="/login" className="no-underline">
              <FaUserCircle className="text-2xl text-black hover:text-red-500" />
            </Link>
          </div>
          <button
            onClick={onCartClick}
            className="relative focus:outline-none cursor-pointer"
            aria-label="Open cart drawer"
          >
            <FaShoppingCart className="text-2xl text-black hover:text-red-500" />
          </button>
        </div>
        {/* Hamburger for mobile/tablet at right end */}
        <button
          className="lg:hidden ml-2 text-black focus:outline-none"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {/* Mobile menu */}
        <div
          className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto bg-black/40' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setMobileOpen(false)}
        >
          <div
            className={`absolute top-0 left-0 w-4/5 max-w-xs h-full bg-white shadow-lg p-6 flex flex-col gap-6 transform transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
            onClick={(e) => e.stopPropagation()}
          >
              <button
                className="self-end mb-4 text-black"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    d="M6 6l12 12M6 18L18 6"
                  />
                </svg>
              </button>
              <ul className="flex flex-col gap-4">
                {menuItems.map((item) =>
                  !item.submenu ? (
                    <li key={item.name}>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `block px-3 py-2 rounded text-black font-bold text-lg lg:text-xl ${
                            isActive ? "text-red-600" : "hover:text-red-500"
                          }`
                        }
                        onClick={() => setMobileOpen(false)}
                        end
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  ) : (
                    <li key={item.name}>
                      <button
                        className="w-full text-left px-3 py-2 rounded text-black font-bold text-lg lg:text-xl hover:text-red-500 flex items-center justify-between"
                        onClick={() => setCategoryOpen((v) => !v)}
                        aria-expanded={categoryOpen}
                        aria-controls="mobile-category-menu"
                        type="button"
                      >
                        {item.name}
                        <svg
                          className={`ml-2 transition-transform ${categoryOpen ? "rotate-90" : "rotate-0"}`}
                          width="18"
                          height="18"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            d="M9 6l6 6-6 6"
                          />
                        </svg>
                      </button>
                      {categoryOpen && (
                        <ul
                          id="mobile-category-menu"
                          className="pl-4 mt-2 flex flex-col gap-2"
                        >
                          {item.submenu.map((sub) => (
                            <li key={sub.name}>
                              <NavLink
                                to={sub.path}
                                className={({ isActive }) =>
                                  `block px-3 py-2 rounded text-black font-medium ${
                                    isActive
                                      ? "text-red-600"
                                      : "hover:text-red-500"
                                  }`
                                }
                                onClick={() => setMobileOpen(false)}
                              >
                                {sub.name}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ),
                )}
              </ul>
              <div className="flex items-center gap-4 mt-6">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-200"
                  />
                  <FiSearch className="absolute right-2 top-3 text-gray-400" />
                </div>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    if (onCartClick) onCartClick();
                  }}
                  className="focus:outline-none cursor-pointer"
                  aria-label="Open cart drawer"
                >
                  <FaShoppingCart className="text-2xl text-black hover:text-red-500" />
                </button>
              </div>
            </div>
          </div>
      </nav>
    </header>
  );
};

Menu.defaultProps = {
  onCartClick: undefined,
};

export default Menu;
