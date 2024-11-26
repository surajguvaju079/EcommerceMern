import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Dialog, DialogTitle } from "../ui/dialog";
import OrderDetails from "./order-details";
import {
  getAllOrdersAdmin,
  getOrderDetailsAdmin,
  resetOrderDetails,
} from "@/store/admin/order-slice";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "../ui/badge";

const AdminOrdersView = () => {
  const { orderLists, orderDetails } = useSelector((state) => state.adminorder);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  if (orderDetails === null) {
  }

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrdersAdmin(user?.id))
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }, [dispatch]);
  console.log(orderLists);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  const handleOrderDetails = (getItem) => {
    setOpenDetailsDialog(true);

    dispatch(getOrderDetailsAdmin(getItem._id))
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableHead>OrderId</TableHead>
            <TableHead>Order date</TableHead>
            <TableHead>Order Status</TableHead>
            <TableHead>Order Price</TableHead>
            <TableHead>
              <span className="sr-only">Details</span>
            </TableHead>
          </TableHeader>
          <TableBody>
            {orderLists && orderLists.length > 0
              ? orderLists.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item?._id}</TableCell>
                    <TableCell>{item?.orderDate?.split("T")[0]}</TableCell>
                    <TableCell>
                      <Badge
                        className={`${
                          item?.orderStatus === "confirmed"
                            ? "bg-green-500"
                            : item?.orderStatus === "rejected"
                            ? "bg-red-700"
                            : "bg-black"
                        } py-2 w-3/5 text-muted-foreground grid place-content-center  text-white`}
                      >
                        {item?.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>${item?.totalAmount}</TableCell>
                    <TableCell>
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          dispatch(resetOrderDetails());
                        }}
                      >
                        <DialogTitle>
                          <Button
                            onClick={() => {
                              handleOrderDetails(item);
                            }}
                            className="bg-blue-950 hover:bg-blue-900 text-white"
                          >
                            View Details
                          </Button>
                        </DialogTitle>
                        <OrderDetails orderDetails={orderDetails} />
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
};

export default AdminOrdersView;
