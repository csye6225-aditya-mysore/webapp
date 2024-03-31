import express from "express";
import {sequelize} from "../models/index.js";
import { checkValidRoute } from "../middlewares/index.js";
import logger from "../utils/log.js";

const healthRouter = express.Router();

healthRouter.get("/", async (req, res) => {
    res.set("Cache-Control", "no-cache");
    if(Object.keys(req.body).length > 0 || req.get("Content-Type") != undefined || Object.keys(req.query).length > 0){
        return res.status(400).send();
    }

    const timeoutPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("Connection timeout");
        }, 5000);
    });

    try{
        const val = await Promise.race([sequelize.authenticate(), timeoutPromise]);
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
