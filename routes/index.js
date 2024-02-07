import express from "express";
import healthRouter from "./health.js";
import userRouter from "./userRoutes.js";

const routes = (app) => {
    app.use("/healthz", healthRouter);
    app.use("/v1/user", userRouter);
}

export default routes;