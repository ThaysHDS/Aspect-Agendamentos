import { createContext, useState, ReactNode } from "react";

type DashboardContextType = {
  exams: any[];
  appointments: any[];
  activeMenu: string;
  setExams: (e: any[]) => void;
  setAppointments: (a: any[]) => void;
  setActiveMenu: (menu: string) => void;
};

export const DashboardContext = createContext<DashboardContextType>({
  exams: [],
  appointments: [],
  activeMenu: "",
  setExams: () => {},
  setAppointments: () => {},
  setActiveMenu: () => {},
});

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [exams, setExams] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [activeMenu, setActiveMenu] = useState("");

  return (
    <DashboardContext.Provider value={{ exams, appointments, activeMenu, setExams, setAppointments, setActiveMenu }}>
      {children}
    </DashboardContext.Provider>
  );
}
