import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import styled from "styled-components";
import 'react-calendar/dist/Calendar.css';
import { colors, fonts } from "../styles/theme";
import ScheduleModal from "./ScheduleModal"; 
import { useApp } from "../context/AppContext";

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${colors.base};
  color: ${colors.text};
  font-family: ${fonts.body};
`;

const Sidebar = styled.div`
  width: 320px;
  background: ${colors.background};
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border-right: 2px solid ${colors.secondary};

  @media (max-width: 768px) {
    width: 100%;
    border-right: none;
    border-bottom: 2px solid ${colors.secondary};
  }
`;

const AccordionSection = styled.div`
  border: 1px solid ${colors.secondary};
  border-radius: 12px;
  background: ${colors.base};
`;

const AccordionHeader = styled.div`
  padding: 0.75rem 1rem;
  font-family: ${fonts.title};
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
`;

const AccordionContent = styled.div<{ open: boolean }>`
  padding: ${(props) => (props.open ? "1rem" : "0")};
  max-height: ${(props) => (props.open ? "500px" : "0")};
  overflow: hidden;
  transition: all 0.3s ease-in-out;
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
`;

const WelcomeTitle = styled.h1`
  font-family: ${fonts.title};
  font-size: 2rem;
  font-weight: 700;
  color: ${colors.primary};
  margin: 0;
`;

const WelcomeWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 1.5rem;
  height: 220px;
  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`;

const WelcomeLeft = styled.div`
  flex: 1.2;
  position: relative;
  background-image: url('/dashboard-bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 16px;
  padding: 1rem;
  color: #000; 
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  h2, p {
    position: relative;
    z-index: 1;
    margin: 0;
    color: #191919; 
  }

  h2 {
    font-family: ${fonts.title};
    font-size: 1.4rem;
    margin-bottom: 0.25rem;
  }

  p {
    font-size: 0.9rem;
    line-height: 1.4;
  }
`;

const WelcomeRight = styled.div`
  flex: 1;
  background: #8cd1cd;
  border-radius: 16px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  color: #191919;

  h2, p {
    margin: 0;
    color: #191919;
  }

  h2 {
    font-family: ${fonts.title};
    font-size: 1.2rem;
    margin-bottom: 0.25rem;
  }

  p {
    font-size: 0.85rem;
    line-height: 1.4;
  }
`;

const Card = styled.div`
  background: ${colors.base};
  border: 1px solid ${colors.secondary};
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const Button = styled.button<{ variant?: "primary" | "danger" }>`
  background: ${(p) =>
    p.variant === "danger" ? colors.error : colors.primary};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-family: ${fonts.body};
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background: ${(p) =>
      p.variant === "danger" ? "#d33" : colors.secondary};
  }
`;

const Accordion = ({ title, isOpen, toggle, children }: { title: string; isOpen: boolean; toggle: () => void; children: React.ReactNode }) => (
  <AccordionSection>
    <AccordionHeader onClick={toggle}>
      {title} <span>{isOpen ? "-" : "+"}</span>
    </AccordionHeader>
    <AccordionContent open={isOpen}>{children}</AccordionContent>
  </AccordionSection>
);

const ExamCard = ({ name, specialty }: { name: string; specialty: string }) => (
  <Card>
    <strong>{name}</strong> <br />
    Especialidade: {specialty}
  </Card>
);

const AppointmentCard = ({ appointment, onDelete }: { appointment: any; onDelete: (id: number) => void }) => (
  <Card>
    <strong>{appointment.exame?.nome || appointment.exameName}</strong> <br />
    Data e Hora: {new Date(appointment.dataHora).toLocaleString()} <br />
    Observações: {appointment.observacoes || "-"} <br />
    <Button variant="danger" onClick={() => onDelete(appointment.id)}>
      Excluir
    </Button>
  </Card>
);

export default function Dashboard() {
  const { exames, agendamentos, carregarExames, carregarAgendamentos, criarAgendamento, excluirAgendamento } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState({ exams: false, scheduling: false });

  useEffect(() => {
    carregarExames();
    carregarAgendamentos();
  }, []);

  return (
    <Container>
      <Sidebar>
        <Accordion
          title="Gerenciamento de Exames"
          isOpen={open.exams}
          toggle={() => setOpen((p) => ({ ...p, exams: !p.exams }))}
        >
          {exames.map((exam) => (
            <ExamCard key={exam.id} name={exam.nome} specialty={exam.especialidade} />
          ))}
        </Accordion>

        <Accordion
          title="Agendamento de Exames"
          isOpen={open.scheduling}
          toggle={() => setOpen((p) => ({ ...p, scheduling: !p.scheduling }))}
        >
          <Button onClick={() => setShowModal(true)}>Adicionar Agendamento</Button>
          {agendamentos.map((appt) => (
            <AppointmentCard key={appt.id} appointment={appt} onDelete={excluirAgendamento} />
          ))}
        </Accordion>
      </Sidebar>

      <ContentArea>
        <WelcomeTitle>Olá!</WelcomeTitle>

        <WelcomeWrapper>
          <WelcomeLeft>
            <h2>Bem-vindo de volta!</h2>
            <p>Acompanhe e agende seus exames com facilidade.</p>
          </WelcomeLeft>

          <WelcomeRight>
            <h3>É um prazer ter você aqui!</h3>
            <p>
              Para acessar seus exames ou agendar novos, utilize o menu ao lado.<br />
              Lá você encontra todas as opções para visualizar, marcar ou cancelar seus
              agendamentos de forma prática e organizada.<br />
              Seu tempo é importante — estamos aqui para tornar seu dia mais simples e
              seu cuidado com a saúde ainda mais fácil.
            </p>
          </WelcomeRight>
        </WelcomeWrapper>

        <Calendar
          value={new Date()}
          tileContent={({ date }) => {
            const dayAppointments = agendamentos.filter(
              (a) => new Date(a.dataHora).toDateString() === date.toDateString()
            );
            return dayAppointments.length ? (
              <div style={{ fontSize: "0.75rem", color: colors.primary }}>
                {dayAppointments.length} agendamento(s)
              </div>
            ) : null;
          }}
        />
      </ContentArea>

      {showModal && (
        <ScheduleModal
          exames={exames}
          onClose={() => setShowModal(false)}
          onSave={criarAgendamento}
        />
      )}
    </Container>
  );
}

