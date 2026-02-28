import { useState } from "react";
import CommonForm from "../Common/form";
import { DialogContent, DialogTitle, DialogDescription } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  updateOrderStatus,
} from "../../store/order-slice";
import { useToast } from "../ui/use-toast";

const initialFormData = {
  status: "",
};


function AdminOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialFormData);
  const [isUpdating, setIsUpdating] = useState(false);
  const [localOrderStatus, setLocalOrderStatus] = useState(orderDetails?.orderStatus);
  const authState = useSelector((state) => state.auth);
  const user = authState ? authState.user : null;
  const dispatch = useDispatch();
  const { toast } = useToast();

  function handleUpdateStatus(event) {
    event.preventDefault();
    const { status } = formData;
    setIsUpdating(true);
    dispatch(
      updateOrderStatus({ id: orderDetails?._id, orderStatus: status }),
    ).then((data) => {
      setIsUpdating(false);
      if (data?.payload?.success || data?.payload?.orderStatus) {
        setLocalOrderStatus(status); // update status in dialog immediately
        setFormData(initialFormData);
        toast({
          title: data?.payload?.message || "Order status updated!",
          variant: "success",
        });
        // Optionally refresh all orders in background
        dispatch(getAllOrdersForAdmin());
      } else {
        toast({
          title: data?.payload?.message || "Failed to update order status.",
          variant: "destructive",
        });
      }
    }).catch(() => {
      setIsUpdating(false);
      toast({
        title: "Failed to update order status.",
        variant: "destructive",
      });
    });
  }

  return (
    <DialogContent className="sm:max-w-[600px] bg-gradient-to-br from-white via-gray-50 to-blue-50 border border-blue-100 shadow-2xl rounded-2xl">
      <DialogTitle as="h2">Order Details</DialogTitle>
      <DialogDescription>
        View and manage the details and status of this order. All order,
        payment, and shipping information is shown below.
      </DialogDescription>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>
              {(orderDetails?.orderDate || orderDetails?.createdAt) && typeof (orderDetails?.orderDate || orderDetails?.createdAt) === "string"
                ? (orderDetails.orderDate || orderDetails.createdAt).split("T")[0]
                : "N/A"}
            </Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>₦{orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment method</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>
              <Badge
                className={`py-1 px-3 ${
                  localOrderStatus === "processing"
                    ? "bg-blue-500 text-white"
                    : localOrderStatus === "shipped"
                      ? "bg-yellow-400 text-black"
                      : localOrderStatus === "delivered"
                        ? "bg-green-500 text-white"
                        : localOrderStatus === "cancelled"
                          ? "bg-red-600 text-white"
                          : "bg-black text-white"
                }`}
              >
                {localOrderStatus}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              {(orderDetails?.items && orderDetails.items.length > 0
                ? orderDetails.items
                : orderDetails?.cartItems && orderDetails.cartItems.length > 0
                  ? orderDetails.cartItems
                  : []
              ).map((item, idx) => (
                <li key={idx} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    {item.selectedImage && (
                      <img
                        src={item.selectedImage}
                        alt={item.name || item.title}
                        className="w-12 h-12 object-cover rounded border"
                      />
                    )}
                    <span>Title: {item.name || item.title}</span>
                  </div>
                  <span>Quantity: {item.quantity}</span>
                  <span>Price: ₦{item.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>{user ? user.userName : "Guest"}</span>
              <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.city}</span>
              <span>{orderDetails?.addressInfo?.pincode}</span>
              <span>{orderDetails?.addressInfo?.phone}</span>
              <span>{orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>

        <div>
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "processing", label: "Processing" },
                  { id: "shipped", label: "Shipped" },
                  { id: "delivered", label: "Delivered" },
                  { id: "cancelled", label: "Cancelled" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={isUpdating ? "Updating..." : "Update Order Status"}
            isBtnDisabled={isUpdating}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;
