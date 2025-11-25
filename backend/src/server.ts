import express from "express";
import cors from "cors";
import router from "./routes/index";
import { AppDataSource } from "./database/data-source";

const app = express();

AppDataSource.initialize()
  .then(() => console.log("Banco conectado!"))
  .catch((err) => console.error("Erro ao conectar banco:", err));

app.use(cors());
app.use(express.json());

app.use("/api", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));


