import { Router } from "express";
import { AppDataSource } from "../database/data-source";
import { Exame } from "../entities/Exame";
import { Agendamento } from "../entities/Agendamento";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

// -------------------- Middleware JWT --------------------
const authMiddleware = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Token ausente" });

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

// -------------------- EXAMES --------------------
router.get("/exames", async (req, res) => {
  const exames = await AppDataSource.getRepository(Exame).find();
  res.json(exames);
});

// ----------------- AGENDAMENTOS -----------------

// Listar agendamentos do usuário logado
router.get("/agendamentos", authMiddleware, async (req: any, res) => {
  const userId = req.user.id;
  const agendamentos = await AppDataSource.getRepository(Agendamento).find({
    where: { user: { id: userId } },
    relations: ["exame", "user"],
  });

  res.json(
    agendamentos.map((a) => ({
      id: a.id,
      dataHora: a.dataHora,
      observacoes: a.observacoes,
      exameTitulo: a.exame.titulo,
      userEmail: a.user.email,
    }))
  );
});

// Criar agendamento para o usuário logado
router.post("/agendamentos", authMiddleware, async (req: any, res) => {
  const userId = req.user.id;
  const { exameId, dataHora, observacoes } = req.body;

  const exameRepo = AppDataSource.getRepository(Exame);
  const userRepo = AppDataSource.getRepository(User);
  const agendamentoRepo = AppDataSource.getRepository(Agendamento);

  const exame = await exameRepo.findOneBy({ id: exameId });
  const user = await userRepo.findOneBy({ id: userId });

  if (!exame) return res.status(404).json({ error: "Exame não encontrado" });
  if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

  const existe = await agendamentoRepo.findOne({
    where: { exame: { id: exameId }, dataHora, user: { id: userId } },
  });

  if (existe) return res.status(400).json({ error: "Agendamento já existe" });

  const agendamento = agendamentoRepo.create({ exame, user, dataHora, observacoes });
  await agendamentoRepo.save(agendamento);

  res.status(201).json(agendamento);
});

// Excluir agendamento do usuário logado
router.delete("/agendamentos/:id", authMiddleware, async (req: any, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const repo = AppDataSource.getRepository(Agendamento);

  const agendamento = await repo.findOne({
    where: { id: Number(id), user: { id: userId } },
  });
  if (!agendamento) return res.status(404).json({ error: "Agendamento não encontrado" });

  await repo.remove(agendamento);
  res.json({ message: "Agendamento excluído" });
});

// ----------------- USUÁRIOS -----------------
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const userRepo = AppDataSource.getRepository(User);
  const existingUser = await userRepo.findOne({ where: { email } });
  if (existingUser) return res.status(400).json({ message: "Email já cadastrado" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = userRepo.create({ email, password: hashedPassword });
  await userRepo.save(newUser);
  res.status(201).json({ message: "Usuário criado com sucesso" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOne({ where: { email } });
  if (!user) return res.status(401).json({ message: "Usuário não encontrado" });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).json({ message: "Senha incorreta" });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });
  res.json({ token });
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  res.json({ message: `Se o usuário ${email} existir, um email será enviado.` });
});

export default router;


