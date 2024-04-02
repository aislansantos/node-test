import { Request, Response } from "express";
import * as UserService from "../services/User.Service";
import { error } from "console";
import { User } from "../models/User";

export const ping = (req: Request, res: Response) => {
    res.json({ pong: true })
}


export const register = async (req: Request, res: Response) => {
    if (req.body.email && req.body.password) {
        let { email, password } = req.body;

        const newUser = await UserService.createUser(email, password);

        if (newUser instanceof Error) {
            return res.json({ error: newUser.message })
        }

        return res.status(201).json({ id: newUser.id });
    }
    return res.json({ error: "E-mail e/ou senha não enviados." });
}


export const login = async (req: Request, res: Response) => {
    if (req.body.email && req.body.password) {
        let email: string = req.body.email;
        let password: string = req.body.password;

        const user = await UserService.findByEmail(email);

        if (user && UserService.matchPassword(password, user.password)) {
            return res.json({ status: true })
        }

        return res.json({ status: false })
    }
}


export const list = async (req: Request, res: Response) => {
    let users = await UserService.all();

    let list: string[] = [];

    users.forEach((item => list.push(item.email)))

    return res.json({ list })
}
