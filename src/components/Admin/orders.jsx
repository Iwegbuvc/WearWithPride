import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForAdmin } from "../../store/order-slice";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Dialog } from "../ui/dialog";
import AdminOrderDetailsView from "./order-details";
import { Badge } from "../ui/badge";

function AdminOrdersView() {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.adminOrderSlice.orderList);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  function handleFetchOrderDetails(getId) {
    const found = orderList.find((order) => order._id === getId);
    setOrderDetails(found || null);
    setOpenDetailsDialog(true);
  }

  function handleCloseDialog() {
    setOpenDetailsDialog(false);
    setOrderDetails(null);
  }

  return (
    <Card>
      <CardContent>
        <div className="text-xl font-semibold mb-4">All Orders</div>
        {/* Desktop Table */}
        <div className="overflow-x-auto hidden md:block">
          <table className="min-w-full table-auto divide-y">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">
                  Order Date
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">
                  Payment Status
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">
                  Order Status
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">
                  Order Price
                </th>
                <th className="px-6 py-3 text-right text-xs text-gray-500 uppercase">
                  <span className="sr-only">Details</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {orderList && orderList.length > 0
                ? orderList.map((orderItem) => (
                    <tr key={orderItem._id}>
                      <td className="px-6 py-4 font-medium">{orderItem._id}</td>
                      <td className="px-6 py-4">
                        {(orderItem.orderDate || orderItem.createdAt)
                          ? (orderItem.orderDate || orderItem.createdAt).replace("T", " ").slice(0, 19)
                          : "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          className={`py-1 px-3 ${
                            orderItem.paymentStatus === "paid"
                              ? "bg-green-500 text-white"
                              : orderItem.paymentStatus === "Pending" || orderItem.paymentStatus === "pending"
                                ? "bg-yellow-400 text-black"
                                : orderItem.paymentStatus === "Not Paid" || orderItem.paymentStatus === "failed"
                                  ? "bg-red-600 text-white"
                                  : "bg-black text-white"
                          }`}
                        >
                          {orderItem.paymentStatus}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          className={`py-1 px-3 ${
                            orderItem.orderStatus === "processing"
                              ? "bg-blue-500 text-white"
                              : orderItem.orderStatus === "shipped"
                                ? "bg-yellow-400 text-black"
                                : orderItem.orderStatus === "delivered"
                                  ? "bg-green-500 text-white"
                                  : orderItem.orderStatus === "cancelled" || orderItem.orderStatus === "rejected"
                                    ? "bg-red-600 text-white"
                                    : "bg-black text-white"
                          }`}
                        >
                          {orderItem.orderStatus}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">₦{orderItem.totalAmount}</td>
                      <td className="px-6 py-4 text-right">
                        <Button
                          onClick={() => handleFetchOrderDetails(orderItem._id)}
                        >
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {orderList && orderList.length > 0
            ? orderList.map((orderItem) => (
                <div
                  key={orderItem._id}
                  className="bg-white rounded-lg shadow p-4 flex flex-col gap-2 border border-gray-100"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700">
                      Order ID:
                    </span>
                    <span className="font-bold">{orderItem._id}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Date:</span>
                    <span>{(orderItem.orderDate || orderItem.createdAt)
                      ? (orderItem.orderDate || orderItem.createdAt).replace("T", " ").slice(0, 19)
                      : "N/A"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Payment:</span>
                    <Badge
                      className={`py-1 px-3 ${
                        orderItem.paymentStatus === "paid"
                          ? "bg-green-500 text-white"
                          : orderItem.paymentStatus === "Pending" || orderItem.paymentStatus === "pending"
                            ? "bg-yellow-400 text-black"
                            : orderItem.paymentStatus === "Not Paid" || orderItem.paymentStatus === "failed"
                              ? "bg-red-600 text-white"
                              : "bg-black text-white"
                      }`}
                    >
                      {orderItem.paymentStatus}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Order Status:</span>
                    <Badge
                      className={`py-1 px-3 ${
                        orderItem.orderStatus === "processing"
                          ? "bg-blue-500 text-white"
                          : orderItem.orderStatus === "shipped"
                            ? "bg-yellow-400 text-black"
                            : orderItem.orderStatus === "delivered"
                              ? "bg-green-500 text-white"
                              : orderItem.orderStatus === "cancelled"
                                ? "bg-red-600 text-white"
                                : "bg-black text-white"
                      }`}
                    >
                      {orderItem.orderStatus}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-bold text-red-600">
                      ₦{orderItem.totalAmount}
                    </span>
                  </div>
                  <Button
                    className="mt-2 w-full"
                    onClick={() => handleFetchOrderDetails(orderItem._id)}
                  >
                    View Details
                  </Button>
                </div>
              ))
            : null}
        </div>
        {/* Order Details Dialog */}
        {openDetailsDialog && orderDetails && (
          <Dialog open={openDetailsDialog} onOpenChange={handleCloseDialog}>
            <AdminOrderDetailsView orderDetails={orderDetails} />
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
}

export default AdminOrdersView;
