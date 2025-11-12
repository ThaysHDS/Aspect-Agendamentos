import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Exame } from "../entities/Exame";
import { Agendamento } from "../entities/Agendamento";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: process.env.NODE_ENV !== "production",
  logging: false,
  entities: [User, Exame, Agendamento],
});


