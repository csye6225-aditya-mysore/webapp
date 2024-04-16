import request from "supertest";
import {app} from "../server.js";
import { describe } from "mocha";
import { initializeDB, sequelize } from "../models/index.js";
import { expect } from "chai";
import {faker} from "@faker-js/faker";

// Used faker package to generate mock data
const mockUser = {
    "first_name": faker.string.alpha(10),
    "last_name": faker.string.alpha(10),
    "username": faker.internet.email(),
    "password": faker.string.alphanumeric(10)
};

const updateUserBody = {
    "first_name": faker.string.alpha(10),
    "last_name": faker.string.alpha(10),
    "password": faker.string.alphanumeric(10),
}
// TODO: Write a before function to wait for the database to be connected.
before((done) => {
    app.on("App Started", () => done());
});

describe("User Routes integration tests", async () => {

    it("Create an account and using GET call, validate that the account exists", async () => {
        // var auth = await sequelize.authenticate();
        console.log("Executed first");
        // First create a User
        const postResponse = await request(app).post("/v2/user").send(mockUser);
        console.log(postResponse.status);
        expect(postResponse.status).to.equal(201);

        // Send username, password for basic authentication and verify you get a user and check for correctness
        const getResponse = await request(app).get("/v2/user/self").auth(mockUser.username, mockUser.password, {type: "basic"});
        console.log(getResponse.body);
        expect(getResponse.status).to.equal(200);
        const {first_name, last_name, username} = getResponse.body;
        expect(first_name).to.equal(mockUser.first_name);
        expect(last_name).to.equal(mockUser.last_name);
        expect(username).to.equal(mockUser.username);
        // done();
    });

    it("Update the account and using the GET call, verify that the account was updated", async () => {
        console.log("Executed second");

        const putResponse = await request(app).put("/v2/user/self").auth(mockUser.username, mockUser.password, {type: "basic"}).send(updateUserBody);
        expect(putResponse.status).to.equal(204);

        const getResponse = await request(app).get("/v2/user/self").auth(mockUser.username, updateUserBody.password, {type: "basic"});
        expect(getResponse.status).to.equal(200);
        const {first_name, last_name, username} = getResponse.body;
        expect(first_name).to.equal(updateUserBody.first_name);
        expect(last_name).to.equal(updateUserBody.last_name);
        expect(username).to.equal(mockUser.username);
    })
});

// TODO: Write a after function to wait for the database to be destroyed.