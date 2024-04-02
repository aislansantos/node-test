import { User, UserInstance } from "../models/User";
import * as UserService from "./User.Service";

describe("Testing user service", () => {
    //! Dados para teste
    let email: string = "teste@jest.com";
    let password: string = "1234";

    // Antes dos testes temos popular o banco de dados de teste
    beforeAll(async () => {
        /*
            Vamos usar uma função sync no model, que faz a syncronização entre
            a estrutura do model e o que esta no banco de dados.
            Como estamos usando o banco de teste o force true deleta qualquer tabela de usuario nesse caso
            e cria uma nova para teste, usando as tables e campo do models
        */
        await User.sync({ force: true })
    });
    it("should create a new user", async () => {
        const newUser = await UserService.createUser(email, password) as UserInstance;
        expect(newUser).not.toBeInstanceOf(Error);
        expect(newUser).toHaveProperty("id");
        expect(newUser.email).toBe(email);
    });

    it("should not allow to create a user with existing email", async () => {
        const newUser = await UserService.createUser(email, password);
        expect(newUser).toBeInstanceOf(Error);
    });

    it("should find a find user by email", async () => {
        const user = await UserService.findByEmail(email) as UserInstance;
        expect(user.email).toBe(email);
    });

    it("should match the password from database", async () => {
        const user = await UserService.findByEmail(email) as UserInstance;
        const match = UserService.matchPassword(password, user.password);
        expect(match).toBeTruthy();
    });

    it("should not match the password from database", async () => {
        const user = await UserService.findByEmail(email) as UserInstance;
        const match = UserService.matchPassword("invalid", user.password);
        expect(match).toBeFalsy();
    });

    it("should get a list of users", async () => {
        const users = await UserService.all();
        expect(users.length).toBeGreaterThanOrEqual(1);
        users.forEach(item => expect(item).toBeInstanceOf(User))
    });
})