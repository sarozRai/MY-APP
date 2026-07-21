import express from "express";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import orderRouter from "./routes/order.route.js";
import productRouter from "./routes/product.route.js";
import mongoose from "mongoose";
import connectDB from "./config/database.js";
import config from "./config/config.js";

const app = express();
app.use(express.json());

connectDB();

app.use("/api/", authRouter);
app.use("/api/users", userRouter);
app.use("/api", productRouter);
app.use("/api", orderRouter);

// app.listen(config.port, () => {
//   console.log(`Server is running on ${config.port} port`);
// });


export default app;
