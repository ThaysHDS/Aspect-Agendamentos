import { AppDataSource } from "./database/data-source";
import { Exame } from "./entities/Exame";
import { Agendamento } from "./entities/Agendamento";
import { User } from "./entities/User";
import bcrypt from "bcrypt";

async function seed() {
  try {
    await AppDataSource.initialize();
    console.log("Banco conectado!");

    const exameRepo = AppDataSource.getRepository(Exame);
    const agendamentoRepo = AppDataSource.getRepository(Agendamento);
    const userRepo = AppDataSource.getRepository(User);

    // Limpa dados existentes
    await agendamentoRepo.delete({});
    await exameRepo.delete({});
    await userRepo.delete({});

    // Cria usuários de teste
    const hashedPassword = await bcrypt.hash("123456", 10);
    const users = userRepo.create([
      { email: "teste1@email.com", password: hashedPassword },
      { email: "teste2@email.com", password: hashedPassword },
    ]);
    await userRepo.save(users);
    console.log("Usuários criados!");

    // Cria exames de teste
    const exames = exameRepo.create([
      { titulo: "Exame de Sangue" },
      { titulo: "Exame de Urina" },
      { titulo: "Raio-X" },
    ]);
    await exameRepo.save(exames);
    console.log("Exames criados!");

    // Cria agendamentos de teste, associando ao primeiro usuário
    const agendamentos = agendamentoRepo.create([
      { exame: exames[0], dataHora: "2025-11-12 09:00", observacoes: "Jejum" },
      { exame: exames[1], dataHora: "2025-11-12 10:00", observacoes: "Levar frasco" },
      { exame: exames[2], dataHora: "2025-11-12 11:00", observacoes: "Sem observações" },
    ]);
    await agendamentoRepo.save(agendamentos);
    console.log("Agendamentos criados!");

    process.exit(0);
  } catch (err) {
    console.error("Erro ao popular o banco:", err);
    process.exit(1);
  }
}

seed();
