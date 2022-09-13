import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import adminRouter from "./router/adminRouter.js";
import userRouter from "./router/userRouter.js";
import authRouter from "./router/authRouter.js";
import { verifyToken } from "./middleware/authMiddleware.js";
dotenv.config();

const server = express();

server.use(express.json());
server.use(cors());
server.use("/auth", authRouter);
server.use(verifyToken)
server.use("/admin", adminRouter);
server.use("/user", userRouter);

const PORT = process.env.PORT || 3000;
server.listen(8080, () =>
    console.log(`server listen on http://localhost:${PORT}`)
);