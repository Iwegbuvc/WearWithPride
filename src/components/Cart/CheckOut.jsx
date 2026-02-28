import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import PayStackButton from "./PayStackButton";
import API from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

const CheckOut = () => {
  const { clearCart } = useCart();
  const navigate = useNavigate();
  const [cart, setCart] = useState({ items: [], totalPrice: 0 });
  const [checkoutId, setCheckoutId] = useState(null);
  const [payAmount, setPayAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const checkoutInProgress = useRef(false);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });
  const { user } = useAuth();
  const userEmail = user?.email || "user@example.com";

  // Fetch cart from backend on mount
  useEffect(() => {
    async function fetchCart() {
      try {
        const res = await API.get("/cart");
        setCart(res.data);
      } catch (err) {
        setCart({ items: [], totalPrice: 0 });
      }
    }
    fetchCart();
    // Optionally fetch user email from backend or localStorage
    // No longer needed: userEmail comes from AuthContext
  }, []);

  // CREATE CHECKOUT (ORDER)
  const handleCreateCheckout = async (e) => {
    e.preventDefault();
    if (checkoutInProgress.current || loading) return;
    checkoutInProgress.current = true;
    setLoading(true);
    try {
      const res = await API.post("/checkout", { shippingAddress });
      setCheckoutId(res.data.orderId);
      setPayAmount(res.data.amount);
    } catch (err) {
      alert(err?.response?.data?.message || "Checkout failed");
      checkoutInProgress.current = false;
    } finally {
      setLoading(false);
    }
  };

  // HANDLE PAYSTACK PAYMENT (redirect or use PayStackButton)
  const handlePaystackInit = async () => {
    try {
      const res = await API.post("/checkout/initialize", {
        orderId: checkoutId,
        email: userEmail,
      });
      window.location.href = res.data.authorizationUrl;
    } catch (err) {
      alert(err?.response?.data?.message || "Payment initialization failed");
    }
  };

  // HANDLE PAYMENT SUCCESS (after Paystack redirects back)
  const handlePaymentSuccess = async (reference) => {
    if (paymentProcessing) return;
    setPaymentProcessing(true);
    try {
      await API.post("/checkout/verify", {
        reference,
        orderId: checkoutId,
      });
      // Clear backend cart and context cart
      await API.delete("/cart/clear");
      if (clearCart) await clearCart();
      localStorage.removeItem("cart");
      navigate(`/order-confirmation/${checkoutId}`);
    } catch (err) {
      alert(err?.response?.data?.message || "Payment verification failed");
    }
  };

  if (!cart || !cart.items?.length) {
    return <p className="text-center mt-20">Your cart is empty</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 px-2 sm:px-6 flex justify-center items-start">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* LEFT */}
        <div className="bg-white/90 rounded-3xl shadow-2xl p-8 border border-gray-100">
          <h2 className="text-3xl font-extrabold mb-8 tracking-tight text-gray-900 font-poppins">Checkout</h2>
          <form onSubmit={handleCreateCheckout} className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Contact Details</h3>
              <label className="block text-gray-600 text-sm mb-1">Email Address</label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-red-200 focus:outline-none text-gray-700 font-medium"
                value={userEmail}
                disabled
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Delivery</h3>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <input
                  placeholder="First Name"
                  value={shippingAddress.firstName}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })}
                  className="px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-red-200 focus:outline-none text-gray-700 font-medium"
                  required
                />
                <input
                  placeholder="Last Name"
                  value={shippingAddress.lastName}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })}
                  className="px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-red-200 focus:outline-none text-gray-700 font-medium"
                  required
                />
              </div>
              <input
                placeholder="Address"
                value={shippingAddress.address}
                onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-red-200 focus:outline-none text-gray-700 font-medium mb-3"
                required
              />
              <div className="grid grid-cols-2 gap-4 mb-3">
                <input
                  placeholder="City"
                  value={shippingAddress.city}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                  className="px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-red-200 focus:outline-none text-gray-700 font-medium"
                  required
                />
                <input
                  placeholder="Postal Code"
                  value={shippingAddress.postalCode}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                  className="px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-red-200 focus:outline-none text-gray-700 font-medium"
                  required
                />
              </div>
              <input
                placeholder="Country"
                value={shippingAddress.country}
                onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-red-200 focus:outline-none text-gray-700 font-medium mb-3"
                required
              />
              <input
                placeholder="Phone"
                value={shippingAddress.phone}
                onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-red-200 focus:outline-none text-gray-700 font-medium"
                required
              />
            </div>
            {/* PAYMENT */}
            {!checkoutId ? (
              <button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer bg-gradient-to-r from-red-500 to-red-700 text-white px-4 py-3 rounded-xl font-bold text-lg shadow-lg hover:from-red-600 hover:to-red-800 transition-all duration-150"
              >
                {loading ? "Processing..." : "Proceed to Payment"}
              </button>
            ) : (
              <div className="space-y-4">
                <div className="text-center sm:text-left">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">Pay with Paystack</h3>
                  <p className="text-sm text-gray-500 mt-1">Secure payment powered by Paystack</p>
                </div>
                <button
                  type="button"
                  className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white px-4 py-3 rounded-xl font-bold text-lg shadow-lg hover:from-green-600 hover:to-green-800 transition-all duration-150"
                  onClick={handlePaystackInit}
                >
                  Pay Now
                </button>
              </div>
            )}
          </form>
        </div>
        {/* RIGHT */}
        <div className="bg-white/80 p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col min-h-[400px]">
          <h3 className="text-xl font-bold mb-6 text-gray-900">Order Summary</h3>
          <div className="divide-y divide-gray-200 mb-6">
            {cart.items.map((item, index) => (
              <div
                key={item._id || index}
                className="flex items-center justify-between py-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.selectedImage || item.product?.images?.[0]?.url}
                    alt={item.product?.name || "Product"}
                    className="w-16 h-16 object-cover rounded-lg border border-gray-200 shadow-sm"
                  />
                  <div>
                    <h3 className="text-base font-semibold text-gray-800">{item.product?.name}</h3>
                    <p className="text-xs text-gray-500">Size: {item.size || "N/A"}</p>
                  </div>
                </div>
                <p className="text-lg font-bold text-gray-900">
                  ₦{(item.priceAtTime * item.quantity).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center text-base mb-2 font-medium">
            <span>Subtotal</span>
            <span>₦{cart.totalPrice?.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center text-base mb-2">
            <span>Shipping</span>
            <span className="text-green-600 font-semibold">Free</span>
          </div>
          <div className="flex justify-between items-center text-lg mt-4 border-t pt-4 font-extrabold">
            <span>Total</span>
            <span>₦{cart.totalPrice?.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
