import { useState, useEffect, useRef } from "react";
import Calendar from "react-calendar";
import styled from "styled-components";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import ScheduleModal from "./ScheduleModal";
import { colors, fonts } from "../styles/theme";

/* ----------------------- Styled Components ----------------------- */

const StyledCalendar = styled(Calendar)`
  width: 90%;
  max-width: 450px;
  margin: 0 auto;
  background-color: #f6fafd;
  border: none;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  font-family: 'Poppins', sans-serif;

  .react-calendar__tile {
    border-radius: 8px;
    transition: background 0.2s, color 0.2s;
  }

  .react-calendar__tile--now {
    background: #e0f2ff;
    font-weight: 600;
    color: #0077cc;
  }

  .react-calendar__tile--active {
    background: #0077cc;
    color: white;
  }

  .react-calendar__navigation {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;

    button {
      color: #0077cc;
      min-width: 44px;
      background: none;
      font-size: 1rem;
      font-family: 'Poppins', sans-serif;

      &:disabled {
        opacity: 0.5;
      }
    }

    .react-calendar__navigation__label {
      font-weight: 600;
      font-size: 1.1rem;
      text-transform: capitalize;
    }
  }

  .react-calendar__navigation button[aria-label*="Next year"],
  .react-calendar__navigation button[aria-label*="Previous year"] {
    display: none;
  }
`;

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

/* ... mantém o código anterior até WelcomeWrapper ... */

/* Container dos dois blocos */
const WelcomeWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 1.5rem;
  height: 220px; /* 🔹 altura reduzida pela metade */
  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`;

/* Bloco esquerdo com imagem */
const WelcomeLeft = styled.div`
  flex: 1.2;
  position: relative;
  background: url("https://images.unsplash.com/photo-1504814532849-927632fab17d?auto=format&fit=crop&w=1600&q=80")
    center/cover no-repeat;
  border-radius: 16px;
  padding: 1rem; /* 🔹 padding reduzido */
  color: white;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center; /* 🔹 centraliza verticalmente */

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    border-radius: 16px;
  }

  h2, p {
    position: relative;
    z-index: 1;
    margin: 0;
  }

  h2 {
    font-family: ${fonts.title};
    font-size: 1.4rem; /* 🔹 menor */
    margin-bottom: 0.25rem;
  }

  p {
    font-size: 0.9rem;
    line-height: 1.4;
  }
`;

/* Bloco direito colorido */
const WelcomeRight = styled.div`
  flex: 1;
  background: #8cd1cd;
  border-radius: 16px;
  padding: 1rem; /* 🔹 padding reduzido */
  color: #003333;
  font-family: ${fonts.body};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: center; /* 🔹 centraliza verticalmente */

  h3 {
    font-family: ${fonts.title};
    font-size: 1.2rem; /* 🔹 menor */
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.9rem;
    line-height: 1.4;
    margin: 0;
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

/* ----------------------- Subcomponentes ----------------------- */

const Accordion = ({
  title,
  isOpen,
  toggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  toggle: () => void;
  children: React.ReactNode;
}) => (
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

const AppointmentCard = ({
  appointment,
  onDelete,
}: {
  appointment: any;
  onDelete: (id: number) => void;
}) => (
  <Card>
    <strong>{appointment.examName}</strong> <br />
    Data e Hora: {new Date(appointment.date).toLocaleString()} <br />
    Observações: {appointment.notes || "-"} <br />
    <Button variant="danger" onClick={() => onDelete(appointment.id)}>
      Excluir
    </Button>
  </Card>
);

/* ----------------------- Componente Principal ----------------------- */

export default function Dashboard({
  userId,
  userName,
}: {
  userId: number;
  userName: string;
}) {
  const [exams, setExams] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState({ exams: false, scheduling: false });
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (hasLoaded.current) return;
    hasLoaded.current = true;

    const loadData = async () => {
      try {
        const [exRes, apptRes] = await Promise.all([
          axios.get("http://localhost:3000/api/exams"),
          axios.get(`http://localhost:3000/api/appointments?userId=${userId}`),
        ]);
        setExams(exRes.data);
        setAppointments(apptRes.data);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      }
    };

    loadData();
  }, [userId]);

  const handleSaveAppointment = async (data: any) => {
    await axios.post("http://localhost:3000/api/appointments", {
      userId,
      ...data,
    });
    const res = await axios.get(
      `http://localhost:3000/api/appointments?userId=${userId}`
    );
    setAppointments(res.data);
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:3000/api/appointments/${id}`);
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <Container>
      <Sidebar>
        <Accordion
          title="Gerenciamento de Exames"
          isOpen={open.exams}
          toggle={() => setOpen((p) => ({ ...p, exams: !p.exams }))}
        >
          {exams.map((exam) => (
            <ExamCard key={exam.id} name={exam.name} specialty={exam.specialty} />
          ))}
        </Accordion>

        <Accordion
          title="Agendamento de Exames"
          isOpen={open.scheduling}
          toggle={() => setOpen((p) => ({ ...p, scheduling: !p.scheduling }))}
        >
          <Button onClick={() => setShowModal(true)}>Adicionar Agendamento</Button>
          {appointments.map((appt) => (
            <AppointmentCard
              key={appt.id}
              appointment={appt}
              onDelete={handleDelete}
            />
          ))}
        </Accordion>
      </Sidebar>

      <ContentArea>
        <WelcomeTitle>Olá {userName}!</WelcomeTitle>

        {/* ✅ Novos blocos lado a lado */}
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

        <StyledCalendar
          value={new Date()}
          tileContent={({ date }) => {
            const dayAppointments = appointments.filter(
              (a) => new Date(a.date).toDateString() === date.toDateString()
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
          exams={exams}
          onClose={() => setShowModal(false)}
          onSave={handleSaveAppointment}
        />
      )}
    </Container>
  );
}
