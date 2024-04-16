import express from "express";
import healthRouter from "./health.js";
import userRouter from "./userRoutes.js";
import { checkIfValidMethod } from "../middlewares/index.js";
import { verifyEmail } from "../controllers/UserControllers.js";

const routes = (app) => {
    app.use("/healthz",  checkIfValidMethod, healthRouter);
    app.use("/v2/user", userRouter);
    app.use("/verify", verifyEmail);
}

export default routes;