import express from "express";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import orderRouter from "./routes/order.route.js";
import productRouter from "./routes/product.route.js";
import mongoose from "mongoose";
import connectDB from "./config/database.js";
import config from "./config/config.js";
import cors from 'cors';

const app = express();
app.use(express.json());

const corsOptions = {
    origin: ['http://localhost:5173'], // Allowed domains
    methods: ['GET', 'POST', 'PUT', 'DELETE'],                    // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'],            // Allowed custom headers
    credentials: true,                                             // Allow cookies/auth headers
    optionsSuccessStatus: 200                                      // Legacy browser support
};

app.use(cors(corsOptions))

connectDB();
app.get('/', (req, res) => {
    res.json({
        message: "API is working perfectly!",
        status: "success"
    })
})

app.use("/api/", authRouter);
app.use("/api/users", userRouter);
app.use("/api", productRouter);
app.use("/api", orderRouter);

// app.listen(config.port, () => {
//   console.log(`Server is running on ${config.port} port`);
// });


export default app;
