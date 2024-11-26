import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth/auth-routes.js";
import adminRouter from "./routes/admin/products-routes.js";
import shopRouter from "./routes/shop/index.js";
import shopCartRouter from "./routes/shop/cart-routes.js";
import shopAddressRouter from "./routes/shop/address-routes.js";
import shopOrderRouter from "./routes/shop/order-routes.js";
import adminOrderRouter from "./routes/admin/order-routes.js";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "PUT", "DELETE", "POST"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
//app.use(bodyParser)
const port = process.env.PORT || 5000;
const DbPassword = process.env.DB_PASSWORD;
mongoose
  .connect(
    `mongodb+srv://surajguvaju0:${DbPassword}@cluster0.l1dn1.mongodb.net/mern?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((error) => {
    console.log("database is not connected");
  });

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminRouter);
app.use("/api/shop/products", shopRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/admin/order", adminOrderRouter);
app.listen(port, () => {
  console.log(`server is running at port:${port}`);
});
