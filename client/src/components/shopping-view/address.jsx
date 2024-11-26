import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CommonForm from "../common/form";
import { addressFormControls } from "@/config";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddress,
  deleteAddress,
  editAddress,
  fetchAllAddress,
} from "@/store/shop-slice/address-slice";
import { toast } from "@/hooks/use-toast";
import AddressCard from "./address-card";

const initialFormData = {
  address: "",
  city: "",
  notes: "",
  phone: "",
  pincode: "",
};
const Address = ({ setCurrentSelectedAddress }) => {
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.address);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialFormData);
  useEffect(() => {
    dispatch(fetchAllAddress(user?.id));
  }, [dispatch]);
  const handleAddressForm = (e) => {
    e.preventDefault();
    if (addressList.length >= 3 && currentEditedId === null) {
      toast({
        title: "You can add maximum of 3 address",
        variant: "destructive",
      });
      setFormData(initialFormData);
      return;
    }
    currentEditedId !== null
      ? dispatch(
          editAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData,
          })
        )
          .then((data) => {
            console.log(data);
            if (data?.payload?.success) {
              dispatch(fetchAllAddress(user?.id))
                .then((data) => console.log(data))
                .catch((error) => console.log(error));
              toast({
                title: "Address edited successfully",
              });

              setFormData(initialFormData);
              setCurrentEditedId(null);
            }
          })
          .catch((error) => console.log(error))
      : dispatch(addAddress({ ...formData, userId: user.id }))
          .then((data) => {
            console.log(data);
            if (data?.payload?.success) {
              toast({
                title: "Address added successfully",
                variant: "primary",
              });
              dispatch(fetchAllAddress(user.id))
                .then((data) => console.log(data))
                .catch((error) => console.log(error));
              setFormData(initialFormData);
            }
          })
          .catch((error) => console.log(error));
  };

  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  };

  const handleDeleteAddress = (getCurrentAddress) => {
    console.log("current address is", getCurrentAddress._id);
    dispatch(
      deleteAddress({
        userId: user?.id,
        addressId: getCurrentAddress._id,
      })
    )
      .then((data) => {
        if (data?.payload?.success) {
          toast({
            title: "Address deleted successfully",
          });
          dispatch(fetchAllAddress(user?.id));
        }
      })
      .catch((error) => console.log(error));
  };
  const handleEditAddress = (getCurrentAddress) => {
    setCurrentEditedId(getCurrentAddress._id);
    setFormData({
      ...formData,
      address: getCurrentAddress.address,
      city: getCurrentAddress.city,
      notes: getCurrentAddress.notes,
      phone: getCurrentAddress.phone,
      pincode: getCurrentAddress.pincode,
    });
  };

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((item) => (
              <AddressCard
                setCurrentSelectedAddress={setCurrentSelectedAddress}
                addressInfo={item}
                handleDeleteAddress={handleDeleteAddress}
                handleEditAddress={handleEditAddress}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditedId !== null ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControl={addressFormControls}
          buttonText={
            currentEditedId !== null ? "Edit Address" : "Add New Address"
          }
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleAddressForm}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
};

export default Address;
