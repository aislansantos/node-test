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

    it("should not allow register without password", (done) => {
        request(app)
            .post("/register")
            .send(`email=${email}`)
            .then(response => {
                expect(response.body.error).not.toBeUndefined();
                return done();
            })
    });

    it("should not allow register without email", (done) => {
        request(app)
            .post("/register")
            .send(`password=${password}`)
            .then(response => {
                expect(response.body.error).not.toBeUndefined();
                return done();
            })
    });
    it("should not allow register without any data", (done) => {
        request(app)
            .post("/register")
            .send(``)
            .then(response => {
                expect(response.body.error).not.toBeUndefined();
                return done();
            })
    });
    it("should login correctly", (done) => {
        request(app)
            .post("/login")
            .send(`email=${email}&password=${password}`)
            .then(response => {
                expect(response.body.error).toBeUndefined();
                expect(response.body.status).toBeTruthy();
                return done();
            })
    });

    it("should not login with incorrect data", (done) => {
        request(app)
            .post("/login")
            .send(`email=${email}&password=invalid`)
            .then(response => {
                expect(response.body.error).toBeUndefined();
                expect(response.body.status).toBeFalsy();
                return done();
            })
    });
})