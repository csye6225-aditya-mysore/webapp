import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.USERNAME,
    process.env.PASSWORD,
    {
        host: "localhost",
        dialect: "postgres"
    }
);

const initializeDB = async (dbObject) => {
    try{
        await dbObject.authenticate();
        await dbObject.sync({alter: true});
    }
    catch(error){
        console.log(error);
    }
}

export {sequelize, initializeDB};