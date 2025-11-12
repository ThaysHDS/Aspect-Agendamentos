import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #DEF2F1;
  color: #17252A;
  text-align: center;
`;

export default function LandingPage() {
  return (
    <Container>
      <h1>Aspect</h1>
      <p>Gerencie seus exames hospitalares com facilidade</p>
      <Link to="/login">
        <button>Entrar</button>
      </Link>
    </Container>
  );
}
