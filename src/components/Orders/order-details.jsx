import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent, DialogTitle, DialogDescription } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { FaCheckCircle, FaTimesCircle, FaHourglassHalf, FaBoxOpen, FaMoneyCheckAlt, FaShippingFast, FaUser } from "react-icons/fa";

function ShoppingOrderDetailsView({ orderDetails }) {
  const authState = useSelector((state) => state.auth) || {};
  // Prefer name from order, then auth, then fallback
  const userName = orderDetails?.userName || orderDetails?.name || (authState.user && (authState.user.userName || authState.user.name)) || 'John Doe';

  // Helper for status icon and color
  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <FaCheckCircle className="text-green-500 mr-2" size={20} title="Confirmed" />;
      case "rejected":
        return <FaTimesCircle className="text-red-600 mr-2" size={20} title="Rejected" />;
      case "pending":
        return <FaHourglassHalf className="text-yellow-400 mr-2" size={20} title="Pending" />;
      default:
        return <FaBoxOpen className="text-gray-500 mr-2" size={20} title="Unknown" />;
    }
  };

  // Get the first image from the first order item or cart item (if available)
  let firstImage = null;
  if (orderDetails?.orderItems && orderDetails.orderItems.length > 0) {
    const item = orderDetails.orderItems[0];
    firstImage = (item.selectedImage && item.selectedImage.trim() !== "")
      ? item.selectedImage
      : (item.image || (item.images && item.images[0]?.url));
  } else if (orderDetails?.cartItems && orderDetails.cartItems.length > 0) {
    const item = orderDetails.cartItems[0];
    firstImage = (item.selectedImage && item.selectedImage.trim() !== "")
      ? item.selectedImage
      : (item.image || (item.images && item.images[0]?.url));
  }

  // Use orderItems or cartItems for order details
  const items = orderDetails?.orderItems && orderDetails.orderItems.length > 0
    ? orderDetails.orderItems
    : orderDetails?.cartItems || [];

  // Use shippingAddress or addressInfo for shipping info
  const shipping = orderDetails?.shippingAddress || orderDetails?.addressInfo || {};

  return (
    <DialogContent className="max-w-lg w-full p-8 bg-white rounded-3xl shadow-2xl border border-gray-100 animate-fade-in">
      {/* Images */}
      {items && items.length > 0 && (
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {items.map((item, idx) => {
            const imgSrc = (item.selectedImage && item.selectedImage.trim() !== "")
              ? item.selectedImage
              : (item.image || (item.images && item.images[0]?.url));
            return imgSrc ? (
              <img
                key={imgSrc + idx}
                src={imgSrc}
                alt={item.title || item.name || `Ordered product ${idx+1}`}
                className="w-20 h-20 object-cover rounded-xl shadow border border-gray-200 bg-gray-50"
              />
            ) : null;
          })}
        </div>
      )}
      <div className="flex items-center gap-3 mb-2">
        <FaBoxOpen className="text-red-500" size={28} />
        <DialogTitle className="text-2xl font-extrabold tracking-tight">Order Details</DialogTitle>
      </div>
      <DialogDescription className="mb-6 text-gray-600">View and manage the details and status of this order. All order, payment, and shipping information is shown below.</DialogDescription>
      <div className="space-y-6">
        {/* Order Info */}
        <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-xl p-4 border border-gray-100">
          <div className="text-xs text-gray-500">Order ID</div>
          <div className="font-mono text-gray-900 text-xs">{orderDetails?._id}</div>
          <div className="text-xs text-gray-500">Order Date</div>
          <div className="text-gray-900 text-xs">{(orderDetails?.createdAt || orderDetails?.orderDate || '').split("T")[0]}</div>
          <div className="text-xs text-gray-500">Order Price</div>
          <div className="text-gray-900 font-bold text-xs">₦{orderDetails?.totalAmount || orderDetails?.totalPrice}</div>
          <div className="text-xs text-gray-500">Payment method</div>
          <div className="text-gray-900 text-xs">{orderDetails?.paymentMethod}</div>
          <div className="text-xs text-gray-500">Payment Status</div>
          <div>
            <Badge className={`px-3 py-1 rounded-full text-xs ${orderDetails?.paymentStatus === "paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{orderDetails?.paymentStatus}</Badge>
          </div>
          <div className="text-xs text-gray-500">Order Status</div>
          <div>
            <Badge className={`flex items-center px-3 py-1 rounded-full text-xs font-bold ${
              orderDetails?.orderStatus === "confirmed"
                ? "bg-green-100 text-green-700"
                : orderDetails?.orderStatus === "rejected"
                ? "bg-red-100 text-red-700"
                : orderDetails?.orderStatus === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : orderDetails?.orderStatus === "shipped"
                ? "bg-blue-100 text-blue-700"
                : orderDetails?.orderStatus === "delivered"
                ? "bg-green-200 text-green-800"
                : orderDetails?.orderStatus === "cancelled"
                ? "bg-red-200 text-red-800"
                : "bg-gray-200 text-gray-700"
            }`}>
              {getStatusIcon(orderDetails?.orderStatus)}
              {orderDetails?.orderStatus}
            </Badge>
          </div>
        </div>
        {/* Order Items */}
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <div className="font-semibold text-gray-700 flex items-center mb-2"><FaBoxOpen className="mr-2 text-blue-400" />Order Details</div>
          <ul className="space-y-2">
            {items && items.length > 0
              ? items.map((item, idx) => (
                  <li key={(item.title || item.name) + '-' + item.quantity + '-' + idx} className="flex items-center gap-3 bg-gray-50 rounded-lg px-3 py-2 shadow-sm border border-gray-100">
                    <img
                      src={(item.selectedImage && item.selectedImage.trim() !== "") ? item.selectedImage : (item.image || (item.images && item.images[0]?.url))}
                      alt={item.title || item.name || `Ordered product ${idx+1}`}
                      className="w-10 h-10 object-cover rounded-md border border-gray-200 bg-gray-100"
                    />
                    <span className="font-medium text-gray-800 text-sm">{item.title || item.name}</span>
                    <span className="text-gray-600 text-xs">Quantity: {item.quantity}</span>
                    <span className="text-red-600 font-bold text-xs">₦{item.price}</span>
                  </li>
                ))
              : <li className="text-gray-400">No items found.</li>}
          </ul>
        </div>
        {/* Shipping Info */}
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <div className="font-semibold text-gray-700 flex items-center mb-2"><FaShippingFast className="mr-2 text-green-400" />Shipping Info</div>
          <div className="grid gap-1 text-gray-700 bg-gray-50 rounded-lg px-3 py-2">
            {shipping.firstName || shipping.lastName ? (
              <span className="font-semibold text-sm">{shipping.firstName} {shipping.lastName}</span>
            ) : null}
            {shipping.address && <span className="text-sm">{shipping.address}</span>}
            {shipping.city && <span className="text-sm">{shipping.city}</span>}
            {shipping.postalCode && <span className="text-sm">{shipping.postalCode}</span>}
            {shipping.phone && <span className="text-sm">{shipping.phone}</span>}
            {shipping.notes && <span className="text-sm">{shipping.notes}</span>}
            {shipping.country && <span className="text-sm">{shipping.country}</span>}
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;
