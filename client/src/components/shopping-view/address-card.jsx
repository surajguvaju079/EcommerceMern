import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
const AddressCard = ({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
}) => {
  return (
    <Card onClick={() => setCurrentSelectedAddress(addressInfo)}>
      <CardContent className="grid gap-4 pt-3">
        <Label>Address:{addressInfo?.address}</Label>
        <Label>City:{addressInfo?.city}</Label>
        <Label>Pincode:{addressInfo?.pincode}</Label>
        <Label>Phone:{addressInfo?.phone}</Label>
        <Label>Notes:{addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className="flex justify-between p-3">
        <Button
          onClick={() => handleEditAddress(addressInfo)}
          className="bg-blue-950 text-white hover:bg-blue-900"
        >
          Edit
        </Button>
        <Button
          onClick={() => handleDeleteAddress(addressInfo)}
          className="bg-blue-950 text-white hover:bg-blue-900"
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddressCard;
