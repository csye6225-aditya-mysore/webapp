import bcrypt from "bcrypt";
import User from "../models/User.js";
import { DataTypes } from "sequelize";
import {v4} from "uuid";
import { lengthValidation } from "../models/validations.js";
import logger from "../utils/log.js";
import publishUserMessage from "../utils/pubsub.js";
import dotenv from "dotenv";
// logger.add(fileTransport);

dotenv.config();

const verifyEmail = async (req, res, next) => {
    const token = req.query.token;
    try{
        const userObj = await User.findOne({
            where: {
                token: token
            }
        });
        if(userObj.verified){
            return res.status(200).json({msg: "User already verified"});
        }
        // console.log(verifiedUserPayload);
        let tokenTime = userObj.tokenTimestamp;
        let expiryTime = new Date(tokenTime.getTime() + (2 * 60 * 1000));
        let currentTime = new Date().getTime();
        if(currentTime > expiryTime){
            logger.error("Could not verify your email, probably the link expired");
            return res.status(400).json({msg: "Could not verify your email, probably the link expired"});
        }
        if(userObj.token != token){
            logger.error( "Could not verify your email");
            return res.status(400).json({msg: "Could not verify your email"});
        }
        userObj.verified = true;
        await userObj.save();
        logger.info("User verified");
        return res.status(200).json({msg: "Email verified!"});
    }catch(error){
        logger.error(error.message);
        return res.status(400).json({msg: "Could not verify your email, probably the link expired"});
    }
}

const createUser = async (req, res, next) => {
    if(Object.keys(req.query).length > 0){
        return res.status(400).send();
    }
    try{
        const {username, password, first_name, last_name} = req.body;
        const notAllowedProperties = ["account_created", "account_updated", "id"];
        const allowedProperties = ["username", "password", "first_name", "last_name"];
        Object.keys(req.body).forEach((key) => {
            if(notAllowedProperties.includes(key)){
                throw new Error("One or more properties cannot be updated.");
            }
        });

        Object.keys(req.body).forEach((key) => {
            if(!allowedProperties.includes(key)){
                throw new Error("One or more properties cannot be updated.");
            }
        });
        
        lengthValidation(password);
        const hashedPassword = await bcrypt.hash(password, 10);
        var verified = false;
        if(process.env.NODE_ENV === "test"){
            verified = true;
        }
        const token = v4().toString();
        const newUser = await User.create({
            id: v4(),
            first_name: first_name,
            last_name: last_name,
            username: username,
            password: hashedPassword,
            verified: verified,
            account_updated: new Date(),
        });
        logger.info("User created successfully: " + newUser.username);
        logger.debug("User created successfully: " + newUser.username);


        // console.log("token :   ", token);
        const dataObj = {
            "email": newUser.username
        }

        await publishUserMessage(process.env.PUBSUB, dataObj);

        return res.status(201).json({
            id: newUser.id,
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            username: newUser.username,
            account_created: newUser.account_created,
            account_updated: newUser.account_updated
        });
    }
    catch(error){
        // console.log(error);
        logger.warn("There might be some error with request body");
        logger.error(error.message);
        return res.status(400).send();
    }
    
};

const getUser = async (req, res, next) => {
    if(Object.keys(req.query).length > 0){
        return res.status(400).send();
    }
    try{
        console.log("Authenticated!");
        if(!req.user.verified){
            logger.error("User not verified");
            return res.status(403).send();
        }
        const objectToSend = {
            id: req.user.id,
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            username: req.user.username,
            account_created: req.user.account_created,
            account_updated: req.user.account_updated
        }
        logger.debug("User retrieved successfully: " + objectToSend.username);
        return res.status(200).send(objectToSend);
    }
    catch(error){
        logger.error( error.message);
        return res.status(400).send();
    }
}

const updateUser = async (req, res, next) => {
    if(Object.keys(req.query).length > 0){
        return res.status(400).send();
    }
    try{
        if(!req.user.verified){
            console.log("User not verified");
            logger.error("User not verified");
            return res.status(403).send();
        }
        const body = req.body;
        // console.log(Object.keys(body).length);
        if(Object.keys(body).length == 0){
            throw new Error("Body is empty.");
        }
        const notAllowedProperties = ["username", "account_created", "account_updated", "id"];
        Object.keys(body).forEach((key) => {
            if(notAllowedProperties.includes(key)){
                throw new Error("One or more properties cannot be updated.");
            }
        });

        const allowedProperties = ["password", "first_name", "last_name"];
        Object.keys(body).forEach((key) => {
            if(!allowedProperties.includes(key)){
                throw new Error("One or more properties cannot be updated.");
            }
        });
        if(body.password){
            var hashedPassword = await bcrypt.hash(body.password, 10);
            body.password = hashedPassword;
        }
        body.account_updated = new Date();

        await User.update(body, {
            where: {
                id: req.user.id
            }
        });
        logger.info("User updated successfully! : " + req.user.username);
        return res.status(204).send();

    }
    catch(error){
        logger.warn("There might be some error with user update");
        logger.error(error.message);
        // console.log(error);
        return res.status(400).send();
    }
}

export {createUser, getUser, updateUser, verifyEmail};