import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/api";

const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const [checkout, setCheckout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const calculateEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10);
    return orderDate.toLocaleDateString();
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/order/${orderId}`);
        setCheckout(res.data);
      } catch (err) {
        setError("Failed to load order details.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading) {
    return <p className="text-center py-20 text-gray-500">Loading order details...</p>;
  }

  if (error || !checkout) {
    return <div className="text-center py-20 text-gray-500"><p>{error || "Order not found."}</p></div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 bg-white">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-emerald-700 mb-6 sm:mb-8">
        Thank You for Your Order!
      </h1>
      <div className="p-4 sm:p-6 rounded-lg border">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <h2 className="text-base sm:text-lg font-semibold">Order ID: {checkout._id}</h2>
            <p className="text-sm text-gray-500">Order date: {new Date(checkout.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="sm:text-right">
            <p className="text-sm text-emerald-700 font-medium">Estimated Delivery:</p>
            <p className="text-sm text-gray-600">{calculateEstimatedDelivery(checkout.createdAt)}</p>
          </div>
        </div>
        <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
          {checkout.orderItems?.map((item, index) => (
            <div key={`${item.product || item.productId}_${index}`} className="flex flex-col sm:flex-row sm:items-center gap-4 border-b pb-4">
              <img src={item.selectedImage || item.image} alt={item.name} className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md" />
              <div className="flex-1">
                <h4 className="text-sm sm:text-base font-semibold">{item.name}</h4>
                <p className="text-xs sm:text-sm text-gray-500">{item.color} | {item.size}</p>
              </div>
              <div className="sm:text-right">
                <p className="text-sm sm:text-base font-medium">₦{item.price}</p>
                <p className="text-xs sm:text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-1">Payment</h4>
            <p className="text-sm text-gray-600">
              {checkout.paymentStatus === "paid"
                ? `Paid via ${checkout.paymentMethod}`
                : checkout.paymentMethod === "Pay on Delivery"
                  ? "Not Paid (Pay on Delivery)"
                  : "Pending Payment"}
            </p>
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-1">Delivery</h4>
            <p className="text-sm text-gray-600">{checkout.shippingAddress.address}</p>
            <p className="text-sm text-gray-600">{checkout.shippingAddress.city}, {checkout.shippingAddress.country}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
