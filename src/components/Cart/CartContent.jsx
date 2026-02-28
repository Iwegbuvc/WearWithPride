import PropTypes from "prop-types";

import { useCart } from "../../context/CartContext";
import { IoMdTrash } from "react-icons/io";

// Dummy cart items for demonstration
const initialCartItems = [
  {
    id: 1,
    name: "Pride T-Shirt",
    price: 29.99,
    quantity: 2,
    image: "/assets/tshirt1.jpg",
  },
  {
    id: 2,
    name: "Rainbow Cap",
    price: 19.99,
    quantity: 1,
    image: "/assets/cap1.jpg",
  },
  {
    id: 3,
    name: "Rainbow Cap",
    price: 19.99,
    quantity: 1,
    image: "/assets/cap1.jpg",
  },
  // {
  //   id: 4,
  //   name: "Rainbow Cap",
  //   price: 19.99,
  //   quantity: 1,
  //   image: "/assets/cap1.jpg",
  // },
  // {
  //   id: 5,
  //   name: "Rainbow Cap",
  //   price: 19.99,
  //   quantity: 1,
  //   image: "/assets/cap1.jpg",
  // },
  // {
  //   id: 6,
  //   name: "Rainbow Cap",
  //   price: 19.99,
  //   quantity: 1,
  //   image: "/assets/cap1.jpg",
  // },
  // {
  //   id: 7,
  //   name: "Rainbow Cap",
  //   price: 19.99,
  //   quantity: 1,
  //   image: "/assets/cap1.jpg",
  // },
];

const CartContent = () => {
  const { cartItems, removeFromCart, updateQuantity, total } = useCart();

  const handleDelete = (id) => {
    removeFromCart(id);
  };

  const handleQuantityChange = (id, delta) => {
    // Find the current item to get its quantity
    const item = cartItems.find((i) => (i.id || i._id) === id);
    if (!item) return;
    const currentQty = typeof item.quantity === 'number' ? item.quantity : 1;
    const newQty = currentQty + delta;
    if (newQty < 1) return; // Prevent going below 1
    updateQuantity(id, newQty);
  };

  return (
    <div>
      {cartItems.length === 0 ? (
        <div className="text-center text-gray-400 py-10">
          Your cart is empty.
        </div>
      ) : (
        <ul className="space-y-4">
          {cartItems.map((item) => {
            // Prefer product object if present (populated), fallback to legacy fields
            const product = item.product || {};
            const price = typeof item.price === 'number' ? item.price : (typeof product.price === 'number' ? product.price : 0);
            const quantity = typeof item.quantity === 'number' ? item.quantity : 1;
            // Prefer selectedImage if present, then item.image, then product.images[0], then placeholder
            const image = item.selectedImage || item.image || (product.images && product.images[0]?.url) || "/images/placeholder.png";
            const name = item.name || product.title || product.name || "Product";
            return (
              <li
                key={item.id || item._id}
                className="flex items-center gap-4 bg-gradient-to-r from-yellow-50 via-white to-yellow-100 rounded-xl p-4 shadow border border-yellow-200"
              >
                <img
                  src={image}
                  alt={name}
                  className="w-16 h-16 object-cover rounded-lg border-2 border-yellow-300 shadow-sm"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1 gap-2">
                    <span className="font-bold text-gray-900 text-base truncate max-w-[60vw] sm:max-w-full">
                      {name}
                    </span>
                    <button
                      className="flex-shrink-0 ml-2 text-red-500 hover:text-red-700 p-1 rounded-full focus:outline-none"
                      onClick={() => handleDelete(item.id || item._id)}
                      aria-label="Remove item"
                    >
                      <IoMdTrash className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 text-red-600 font-bold flex items-center justify-center focus:outline-none text-lg"
                      onClick={() => handleQuantityChange(item.id || item._id, -1)}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="text-lg font-bold text-gray-900 w-8 text-center select-none bg-white border border-yellow-300 rounded">
                      {quantity}
                    </span>
                    <button
                      className="w-8 h-8 rounded-full bg-green-100 hover:bg-green-200 text-green-700 font-bold flex items-center justify-center focus:outline-none text-lg"
                      onClick={() => handleQuantityChange(item.id || item._id, 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-sm font-bold text-yellow-700 mt-2">
                    Unit: ₦
                    {price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </div>
                </div>
                <div className="font-extrabold text-lg text-red-700 ml-2 whitespace-nowrap">
                  ₦
                  {(price * quantity).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {cartItems.length > 0 && (
        <div className="mt-6 flex justify-between items-center border-t pt-4 border-gray-200 dark:border-neutral-700 bg-yellow-50 rounded-lg px-2 py-3">
          <span className="font-extrabold text-lg text-red-700 drop-shadow">
            Total:
          </span>
          <span className="text-2xl font-extrabold text-red-700 drop-shadow">
            ₦{(typeof total === 'number' ? total : 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
        </div>
      )}
    </div>
  );
};

CartContent.propTypes = {};

export default CartContent;
