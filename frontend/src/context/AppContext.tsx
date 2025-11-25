import { createContext, useContext, useState, ReactNode } from "react";
import { api } from "../api";

interface Exame {
  id: number;
  nome: string;
  especialidade: string;
}

interface Agendamento {
  id: number;
  exameId: number;
  dataHora: string;
  observacoes?: string;
  exame?: Exame;
}

interface User {
  id: number;
  nome: string;
  email: string;
}

interface AppContextProps {
  user: User | null;
  setUser: (u: User | null) => void;

  exames: Exame[];
  agendamentos: Agendamento[];

  carregarExames: () => void;
  carregarAgendamentos: () => void;
  criarAgendamento: (dados: Omit<Agendamento, "id">) => void;
  excluirAgendamento: (id: number) => void;
}

const AppContext = createContext({} as AppContextProps);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [exames, setExames] = useState<Exame[]>([]);
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

  const carregarExames = async () => {
    const res = await api.get("/exames");
    setExames(res.data);
  };

  const carregarAgendamentos = async () => {
    const res = await api.get("/agendamentos");
    setAgendamentos(res.data);
  };

  const criarAgendamento = async (dados: Omit<Agendamento, "id">) => {
    await api.post("/agendamentos", dados);
    carregarAgendamentos();
  };

  const excluirAgendamento = async (id: number) => {
    await api.delete(`/agendamentos/${id}`);
    carregarAgendamentos();
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        exames,
        agendamentos,
        carregarExames,
        carregarAgendamentos,
        criarAgendamento,
        excluirAgendamento,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);

