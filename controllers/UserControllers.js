import bcrypt from "bcrypt";
import User from "../models/User.js";
import { DataTypes } from "sequelize";
import {v4} from "uuid";
import { lengthValidation } from "../models/validations.js";

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
        const newUser = await User.create({
            id: v4(),
            first_name: first_name,
            last_name: last_name,
            username: username,
            password: hashedPassword,
            account_updated: new Date(),
        });
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
        return res.status(400).send();
    }
    
};

const getUser = async (req, res, next) => {
    if(Object.keys(req.query).length > 0){
        return res.status(400).send();
    }
    try{
        console.log("Authenticated!");
        const objectToSend = {
            id: req.user.id,
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            username: req.user.username,
            account_created: req.user.account_created,
            account_updated: req.user.account_updated
        }
        return res.status(200).send(objectToSend);
    }
    catch(error){
        return res.status(400).send();
    }
}

const updateUser = async (req, res, next) => {
    if(Object.keys(req.query).length > 0){
        return res.status(400).send();
    }
    try{
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

        return res.status(204).send();

    }
    catch(error){
        // console.log(error);
        return res.status(400).send();
    }
}

export {createUser, getUser, updateUser};