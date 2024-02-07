import express from "express";
import { createUser, getUser, updateUser } from "../controllers/UserControllers.js";
import { auth } from "../middlewares/authentication.js";

const userRouter = express.Router();

userRouter.post("/", createUser);

userRouter.get("/self", auth, getUser);

userRouter.put("/self", auth, updateUser);

export default userRouter;