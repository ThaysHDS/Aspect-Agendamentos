// ScheduleModal.tsx
import { useState } from "react";
import { theme } from "../styles/theme"; // Importa o theme inteiro
import styled from "styled-components";

const ModalWrapper = styled.div`
  background-color: ${theme.colors.white};
  color: ${theme.colors.textDark};
  padding: 20px;
  border-radius: 8px;
`;

const Header = styled.h2`
  color: ${theme.colors.primary};
  font-family: ${theme.fonts.title};
`;

const Button = styled.button`
  background-color: ${theme.colors.secondary};
  color: ${theme.colors.white};
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: ${theme.fontWeights.medium};

  &:hover {
    opacity: 0.9;
  }
`;

export default function ScheduleModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Abrir Modal</Button>
      {open && (
        <ModalWrapper>
          <Header>Agendar Exame</Header>
          <p>Conteúdo do modal aqui...</p>
          <Button onClick={() => setOpen(false)}>Fechar</Button>
        </ModalWrapper>
      )}
    </>
  );
}
