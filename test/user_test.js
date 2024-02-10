import request from "supertest";
import {app} from "../server.js";
import { describe } from "mocha";
import { initializeDB, sequelize } from "../models/index.js";
import { expect } from "chai";

const mockUser = {
    "first_name": "aditya",
    "last_name": "mysore",
    "username": "ad@gmail.com",
    "password": "aditya"
};
// TODO: Write a before function to wait for the database to be connected.
before((done) => {
    app.on("App Started", () => done());
});

describe("User Routes integration tests", async () => {

    it("Create an account and using GET call, validate that the account exists", async () => {
        // var auth = await sequelize.authenticate();
        console.log("Now Started testing");
        const response = await request(app).post("/v1/user").send(mockUser);
        console.log(response.status);
        expect(response.status).to.equal(201);
    })
});

// TODO: Write a after function to wait for the database to be destroyed.