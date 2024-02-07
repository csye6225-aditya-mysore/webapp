import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes/index.js";
import { checkIfValidMethod, checkValidRoute } from "./middlewares/index.js";
import {initializeDB, sequelize} from "./models/index.js";
import User from "./models/User.js";

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.text());
app.use(express.json());

app.use(checkValidRoute);
routes(app);

app.listen(8000, async () => {
    console.log("Server started on 8000");
    try{
        await initializeDB(sequelize);
    }
    catch(error){
        console.log("Database initialization error!");
        console.log(error);
    }  
});