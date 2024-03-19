import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import logger from "../utils/log.js";

dotenv.config();

const dbName =  process.env.DATABASE_NAME || "example";
const username = process.env.USERNAME || "postgres";
const password = process.env.PASSWORD ||  "postgres";
const host = process.env.DATABASE_HOST || "localhost";


const sequelize = new Sequelize(
    dbName,
    username,
    password,
    {
        host: host,
        dialect: "postgres"
    }
);

const initializeDB = async (dbObject) => {
    try{
        // console.log("Attempting to connect...")
        // console.log(host, username, password, dbName);
        // console.log(value);
        // await pg_client.connect();
        // const result = await pg_client.query(`SELECT datname FROM pg_catalog.pg_database WHERE datname = '${dbName}'`);
        // if(result.rowCount == 0){
        //     await pg_client.query("CREATE DATABASE " + dbName);
        //     console.log("Datbase created")
        // }
        // await pg_client.end();
        // console.log(dbName, host, username, password);
        await dbObject.authenticate();
        await dbObject.sync({alter: true});
        logger.info("Database authenticated successfully!");
    }
    catch(error){
        logger.error("Could not authenticate the given database!");
        console.log(error);
    }
}

export {sequelize, initializeDB};