import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Dialog } from "../ui/dialog";
import AdminOrderDetailsView from "./order-details";
import { Badge } from "../ui/badge";

// Mock data for orders
const mockOrders = [
  {
    _id: "order1",
    orderDate: "2026-02-15T12:00:00Z",
    orderStatus: "confirmed",
    totalAmount: 120.5,
    details: {
      items: [
        { name: "Product A", qty: 2, price: 30 },
        { name: "Product B", qty: 1, price: 60.5 },
      ],
      shipping: "123 Main St, City",
    },
  },
  {
    _id: "order2",
    orderDate: "2026-02-14T09:30:00Z",
    orderStatus: "rejected",
    totalAmount: 80,
    details: {
      items: [{ name: "Product C", qty: 1, price: 80 }],
      shipping: "456 Side St, City",
    },
  },
];

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [orderList] = useState(mockOrders);
  const [orderDetails, setOrderDetails] = useState(null);

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
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Order Date</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Order Status</th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Order Price</th>
                <th className="px-6 py-3 text-right text-xs text-gray-500 uppercase"><span className="sr-only">Details</span></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {orderList && orderList.length > 0
                ? orderList.map((orderItem) => (
                    <tr key={orderItem._id}>
                      <td className="px-6 py-4 font-medium">{orderItem._id}</td>
                      <td className="px-6 py-4">{orderItem.orderDate.split("T")[0]}</td>
                      <td className="px-6 py-4">
                        <Badge className={`py-1 px-3 ${orderItem.orderStatus === "confirmed" ? "bg-green-500" : orderItem.orderStatus === "rejected" ? "bg-red-600" : "bg-black"}`}>{orderItem.orderStatus}</Badge>
                      </td>
                      <td className="px-6 py-4">₦{orderItem.totalAmount}</td>
                      <td className="px-6 py-4 text-right">
                        <Button onClick={() => handleFetchOrderDetails(orderItem._id)}>View Details</Button>
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
                <div key={orderItem._id} className="bg-white rounded-lg shadow p-4 flex flex-col gap-2 border border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700">Order ID:</span>
                    <span className="font-bold">{orderItem._id}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Date:</span>
                    <span>{orderItem.orderDate.split("T")[0]}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Status:</span>
                    <Badge className={`py-1 px-3 ${orderItem.orderStatus === "confirmed" ? "bg-green-500" : orderItem.orderStatus === "rejected" ? "bg-red-600" : "bg-black"}`}>{orderItem.orderStatus}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-bold text-red-600">₦{orderItem.totalAmount}</span>
                  </div>
                  <Button className="mt-2 w-full" onClick={() => handleFetchOrderDetails(orderItem._id)}>
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
