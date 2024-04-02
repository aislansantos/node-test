import 
import { User } from "../models/User";
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
        const newUser = await UserService.createUser(email, password)
        expect(newUser).not.toBeInstanceOf(Error);
        expect(newUser).toHaveProperty("id");
        expect(newUser.email).toBe(email);
    })
})