import {expect} from "chai";
import { getEmailAndPasswordFromToken } from "../middlewares/authentication.js";

describe("Testing webapp", () => {
    it("Simple test case", (done) => {
        expect(1 + 1).to.equal(0);
        done();
    });

    it("Authorization test", (done) => {
        var [email, password] = getEmailAndPasswordFromToken("Basic YWRpdHlhQGdtYWlsLmNvbTphZGl0");
        expect(email).to.equal("aditya@gmail.com");
        expect(password).to.equal("adit");
        done();
    })
});
