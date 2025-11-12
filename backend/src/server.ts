import express from "express";
import cors from "cors";
import router from "./routes/index";
import { AppDataSource } from "./database/data-source";

const app = express();

// Conecta ao banco
AppDataSource.initialize()
  .then(() => console.log("Banco conectado!"))
  .catch((err) => console.error("Erro ao conectar banco:", err));

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api", router);

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));


