import { Router } from "express";

const router = Router();

// Exemplo simples de agendamentos
let appointments: any[] = [];

router.get("/", (req, res) => {
  const userId = Number(req.query.userId);
  const userAppointments = appointments.filter(a => a.userId === userId);
  res.json(userAppointments);
});

router.post("/", (req, res) => {
  const { userId, examId, date, notes } = req.body;
  const id = appointments.length + 1;
  appointments.push({ id, userId, examId, date, notes, examName: `Exame ${examId}` });
  res.status(201).json({ message: "Agendamento criado", id });
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  appointments = appointments.filter(a => a.id !== id);
  res.json({ message: "Agendamento excluído" });
});

export default router;
