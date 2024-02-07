import express from "express";
import healthRouter from "./health.js";
import userRouter from "./userRoutes.js";
import { checkIfValidMethod } from "../middlewares/index.js";

const routes = (app) => {
    app.use("/healthz",  checkIfValidMethod, healthRouter);
    app.use("/v1/user", userRouter);
}

export default routes;