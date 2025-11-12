import { Router } from "express";

const router = Router();

// Exemplo simples de exames
let exams = [
  { id: 1, name: "Hemograma", specialty: "Clínica Geral" },
  { id: 2, name: "Raio-X", specialty: "Radiologia" },
];

router.get("/", (req, res) => {
  res.json(exams);
});

export default router;
