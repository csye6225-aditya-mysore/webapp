import express from "express";
import {sequelize} from "../models/index.js";
import { checkValidRoute } from "../middlewares/index.js";
import logger from "../utils/logger.js";

const healthRouter = express.Router();

healthRouter.get("/", async (req, res) => {
    res.set("Cache-Control", "no-cache");
    if(Object.keys(req.body).length > 0 || req.get("Content-Type") != undefined || Object.keys(req.query).length > 0){
        return res.status(400).send();
    }
    try{
        await sequelize.authenticate();
        console.log("Database connected!");
        logger.info("Database connected!");
        return res.status(200).send();
    }
    catch(error){
        logger.error(error);
        return res.status(503).send();
    }
});

// healthRouter.all("/", async (req, res) => {
//     return res.status(405).send();
// })

export default healthRouter;
