import { Address } from "../../model/address.js";

export const addAddress = async (req, res) => {
  try {
    const { address, city, phone, pincode, userId, notes } = req.body;
    if (!address || !city || !phone || !pincode || !userId || !notes)
      return res
        .status(401)
        .json({ success: false, message: "Invalid data provided" });

    const newlyCreatedAddress = new Address({
      address,
      city,
      phone,
      pincode,
      userId,
      notes,
    });
    await newlyCreatedAddress.save();
    res.status(201).json({ success: true, data: newlyCreatedAddress });
  } catch (error) {
    res.status(401).json({ success: false, message: "Some error occured" });
  }
};
export const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    console.log("userId:", userId, "addressId:", addressId);
    if (!userId || !addressId)
      return res.status(401).json({
        success: false,
        message: "User id and addressId are required",
      });

    const address = await Address.findOneAndDelete({ _id: addressId, userId });
    if (!address)
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });

    res
      .status(201)
      .json({ success: true, message: "data deleted successfully" });
  } catch (error) {
    res.status(401).json({ success: false, message: "Some error occured" });
  }
};
export const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId)
      return res
        .status(500)
        .json({ success: false, message: "user id is required" });
    const addressList = await Address.find({ userId });
    res.status(201).json({ success: true, data: addressList });
  } catch (error) {
    res.status(401).json({ success: false, message: "Some error occured" });
  }
};
export const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;
    if (!userId || !addressId)
      return res.status(401).json({
        success: false,
        message: "User id and addressId are required",
      });

    const address = await Address.findOneAndUpdate(
      { _id: addressId, userId },
      formData,
      { new: true }
    );
    if (!address)
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });

    res.status(201).json({ success: true, data: address });
  } catch (error) {
    res.status(401).json({ success: false, message: "Some error occured" });
  }
};
