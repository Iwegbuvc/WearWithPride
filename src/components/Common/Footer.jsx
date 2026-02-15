import { Link } from "react-router-dom";
// import logo from "../../assets/Logo on golden foil.jpg.jpeg";
import logo from "../../assets/logoGold.jpg";
const Footer = () => {
  return (
    <footer
      className="border-t py-12 bg-gray-900 font-serif"
      style={{
        color: "#fff",
        fontFamily: 'Georgia, Times, "Times New Roman", serif',
      }}
    >
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 px-4 lg:px-8 text-white">
        {/* About Us & Newsletter */}
        <div
          className="flex flex-col items-start sm:col-span-2 lg:col-span-1 lg:ml-0"
          style={{ minWidth: "180px" }}
        >
          <img
            src={logo}
            alt="Logo"
            className="h-24 w-24 mb-6 rounded-full shadow-lg object-cover border-2 bg-white"
            style={{
              width: "96px",
              height: "96px",
              borderRadius: "50%",
              objectFit: "cover",
              borderColor: "#FFD700",
              borderWidth: "2px",
              borderStyle: "solid",
            }}
          />
          <h3 className="text-xs sm:text-base lg:text-xl font-extrabold mb-6 text-white">
            About Us
          </h3>
          <p className="text-base sm:text-lg lg:text-xl font-semibold mb-4 text-white tracking-wide">
            Subscribe to our newsletter to get the latest updates and offers.
          </p>
          <form className="flex flex-col sm:flex-row mt-2 w-full">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 p-3 border border-gray-400 rounded-t-md sm:rounded-l-md sm:rounded-t-none focus:outline-none focus:ring-2 focus:ring-red-600 text-lg lg:text-xl text-white placeholder-white placeholder-opacity-80 mb-2 sm:mb-0"
            />
            <button
              type="submit"
              className="bg-red-600 text-white px-4 rounded-b-md sm:rounded-r-md sm:rounded-b-none text-lg lg:text-xl font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all cursor-pointer w-full sm:w-auto"
            >
              Subscribe
            </button>
          </form>
        </div>
        {/* Shop Links */}
        <div className="sm:ml-8 lg:ml-16 mt-8 sm:mt-0">
          <h3 className="text-2xl lg:text-3xl font-extrabold mb-6 text-white">
            Shop
          </h3>
          <ul className="space-y-4">
            <li>
              <Link
                to="#"
                className="text-xs sm:text-base lg:text-lg font-semibold hover:no-underline text-white"
              >
                Men's tops
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="text-xs sm:text-base lg:text-lg font-semibold hover:no-underline text-white"
              >
                Women's tops
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="text-xs sm:text-base lg:text-lg font-semibold hover:no-underline text-white"
              >
                Men's Bottom Wear
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="text-xs sm:text-base lg:text-lg font-semibold hover:no-underline text-white"
              >
                Women's Bottom Wear
              </Link>
            </li>
          </ul>
        </div>
        {/* Support Links */}
        <div className="sm:ml-8 lg:ml-16 mt-8 sm:mt-0">
          <h3 className="text-2xl lg:text-3xl font-extrabold mb-6 text-white">
            Support
          </h3>
          <ul className="space-y-4">
            <li>
              <Link
                to="#"
                className="text-xs sm:text-base lg:text-lg font-semibold hover:no-underline text-white"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="text-xs sm:text-base lg:text-lg font-semibold hover:no-underline"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="text-xs sm:text-base lg:text-lg font-semibold hover:no-underline"
              >
                FAQ's
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="text-xs sm:text-base lg:text-lg font-semibold hover:no-underline"
              >
                Features
              </Link>
            </li>
          </ul>
        </div>
        {/* Social & Contact */}
        <div className="sm:ml-8 lg:ml-16 mt-8 sm:mt-0">
          <h3 className="text-2xl lg:text-3xl font-extrabold mb-6 text-white">
            Connect
          </h3>
          <ul className="space-y-4">
            <li>
              <a
                href="https://www.instagram.com/w2p____?igsh=OTQ3M2lzMWtkN3Mx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-base lg:text-lg font-semibold hover:no-underline text-white"
              >
                Instagram
              </a>
            </li>
            <li>
              <Link
                to="#"
                className="text-xs sm:text-base lg:text-lg font-semibold hover:no-underline"
              >
                Tiktok
              </Link>
            </li>

            <li>
              <a
                href="https://wa.me/2348085807354"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-base lg:text-lg font-semibold hover:no-underline text-white"
              >
                WhatsApp: 08085807354
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-8">
        <hr className="border-t border-gray-500 opacity-30 w-full mb-4" />
        <div className="text-center text-xs sm:text-base lg:text-lg font-bold text-gray-400 opacity-70">
          &copy; {new Date().getFullYear()} WearWithPride. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
