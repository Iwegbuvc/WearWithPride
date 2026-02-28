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
import { useAuth } from "../../context/AuthContext";
import {
  getAllOrdersByUserId,
  getOrderDetails,
  resetOrderDetails,
} from "../../store/shop/order-slice";
import { Badge } from "../ui/badge";


function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  const dispatch = useDispatch();
  const { user } = useAuth();
  const orderList = useSelector((state) => state.shoppingOrderSlice.orderList);
  const orderDetails = selectedOrderDetails;

  useEffect(() => {
    // console.log('User from AuthContext:', user);
    if (user && user.token) {
      // console.log('Dispatching getAllOrdersByUserId with token:', user.token);
      dispatch(getAllOrdersByUserId(user.token));
    } else {
      // console.warn('No user or user.token found, not dispatching order fetch.');
    }
  }, [dispatch, user]);


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
                    <TableCell>{(orderItem?.createdAt || orderItem?.orderDate || '').split("T")[0]}</TableCell>
                    <TableCell>
                      <Badge
                        className={`py-1 px-3 ${
                          orderItem?.orderStatus === "confirmed" || orderItem?.paymentStatus === "paid"
                            ? "bg-green-500"
                            : orderItem?.orderStatus === "rejected" || orderItem?.paymentStatus === "failed"
                            ? "bg-red-600"
                            : orderItem?.orderStatus === "pending" || orderItem?.paymentStatus === "pending"
                            ? "bg-yellow-400 text-black"
                            : "bg-black"
                        }`}
                      >
                        {orderItem?.orderStatus || orderItem?.paymentStatus || "-"}
                      </Badge>
                    </TableCell>
                    <TableCell>₦{orderItem?.totalAmount || orderItem?.totalPrice}</TableCell>
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
