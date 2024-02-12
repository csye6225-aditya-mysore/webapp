import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import pkg from "pg";
const {Client} = pkg;

dotenv.config();

const dbName = process.env.DATABASE_NAME || "example";
const username = process.env.USERNAME || "postgres";
const password = process.env.PASSWORD || "postgres";
const host = process.env.DATABASE_HOST || "localhost";

const pg_client = new Client({
    host: host,
    user: username,
    password: password,
    port: 5432
});

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
        console.log("Attempting to connect...")
        console.log(host, username, password, dbName);
        await pg_client.connect();
        const result = await pg_client.query(`SELECT datname FROM pg_catalog.pg_database WHERE datname = '${dbName}'`);
        if(result.rowCount == 0){
            await pg_client.query("CREATE DATABASE " + dbName);
            console.log("Datbase created")
        }
        await pg_client.end();
        await dbObject.authenticate();
        await dbObject.sync({alter: true});
    }
    catch(error){
        console.log(error);
    }
}

export {sequelize, initializeDB};