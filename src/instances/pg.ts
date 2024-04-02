import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import db from "./database";

dotenv.config();

console.log(db);
export const sequelize = new Sequelize(
    db.db,
    db.user,
    db.password,
    {
        dialect: "postgres",
        port: parseInt(db.port)
    }
);