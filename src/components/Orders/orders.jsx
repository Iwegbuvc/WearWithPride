import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ShoppingOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersByUserId,
  getOrderDetails,
  resetOrderDetails,
} from "../../store/shop/order-slice";
import { Badge } from "../ui/badge";


function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const authState = useSelector((state) => state.auth) || {};
  const user = authState.user || { id: 'dummyUser', userName: 'John Doe' };

  // Dummy orders data
  const dummyOrders = [
    {
      _id: 'ORD001',
      orderDate: '2026-02-10T12:00:00Z',
      orderStatus: 'confirmed',
      totalAmount: 120.50,
      cartItems: [
        { title: 'T-shirt', quantity: 2, price: 20 },
        { title: 'Shorts', quantity: 1, price: 30 }
      ],
      paymentMethod: 'Credit Card',
      paymentStatus: 'Paid',
      addressInfo: {
        address: '123 Main St',
        city: 'Lagos',
        pincode: '100001',
        phone: '08012345678',
        notes: 'Leave at the door'
      }
    },
    {
      _id: 'ORD002',
      orderDate: '2026-02-12T15:30:00Z',
      orderStatus: 'rejected',
      totalAmount: 75.00,
      cartItems: [
        { title: 'Shoes', quantity: 1, price: 75 }
      ],
      paymentMethod: 'PayPal',
      paymentStatus: 'Refunded',
      addressInfo: {
        address: '456 Side Rd',
        city: 'Abuja',
        pincode: '900001',
        phone: '08087654321',
        notes: ''
      }
    },
    {
      _id: 'ORD003',
      orderDate: '2026-02-14T09:45:00Z',
      orderStatus: 'pending',
      totalAmount: 200.00,
      cartItems: [
        { title: 'Combo Pack', quantity: 1, price: 200 }
      ],
      paymentMethod: 'Bank Transfer',
      paymentStatus: 'Pending',
      addressInfo: {
        address: '789 Market Ave',
        city: 'Port Harcourt',
        pincode: '500001',
        phone: '08011223344',
        notes: 'Call on arrival'
      }
    }
  ];

  // Use dummy orders for display
  const orderList = dummyOrders;
  const orderDetails = selectedOrderDetails;

  function handleFetchOrderDetails(getId) {
    const foundOrder = orderList.find(order => order._id === getId);
    setSelectedOrderDetails(foundOrder);
    setOpenDetailsDialog(true);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0
              ? orderList.map((orderItem) => (
                  <TableRow key={orderItem._id}>
                    <TableCell>{orderItem?._id}</TableCell>
                    <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
                    <TableCell>
                      <Badge
                        className={`py-1 px-3 ${
                          orderItem?.orderStatus === "confirmed"
                            ? "bg-green-500"
                            : orderItem?.orderStatus === "rejected"
                            ? "bg-red-600"
                            : orderItem?.orderStatus === "pending"
                            ? "bg-yellow-400 text-black"
                            : "bg-black"
                        }`}
                      >
                        {orderItem?.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>₦{orderItem?.totalAmount}</TableCell>
                    <TableCell>
                      <Dialog
                        open={openDetailsDialog && orderDetails?._id === orderItem._id}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          setSelectedOrderDetails(null);
                        }}
                      >
                        <Button
                          onClick={() => handleFetchOrderDetails(orderItem?._id)}
                        >
                          View Details
                        </Button>
                        {orderDetails && orderDetails._id === orderItem._id && (
                          <ShoppingOrderDetailsView orderDetails={orderDetails} />
                        )}
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default ShoppingOrders;
