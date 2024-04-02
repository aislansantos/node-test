import request from "supertest";
import app from "../app";
import { User } from "../models/User";

describe("Testing api routes", () => {

    //! Dados para teste
    let email: string = "teste@jest.com";
    let password: string = "1234";


    beforeAll(async () => {
        await User.sync({ force: true })
    });

    it("should ping pong", (done) => {
        request(app)
            .get("/ping")
            .then(response => {
                expect(response.body.pong).toBeTruthy();
                return done();
            })
    });

    it("should register a new user", (done) => {
        request(app)
            .post("/register")
            .send(`email=${email}&password=${password}`)
            .then(response => {
                expect(response.body.error).toBeUndefined();
                expect(response.body).toHaveProperty("id");
                return done();
            })
    });

    it("should not allow register with existing email", (done) => {
        request(app)
            .post("/register")
            .send(`email=${email}&password=${password}`)
            .then(response => {
                expect(response.body.error).not.toBeUndefined();
                return done();
            })
    });

})