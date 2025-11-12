import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { theme } from "../styles/theme";

// Background com imagem
const Background = styled.div`
  height: 100vh;
  width: 100vw;
  background: url("/background.jpg") center/cover no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Glassmorphism container
const GlassContainer = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  width: 350px;
  max-width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

  img {
    width: 120px;
    margin-bottom: 1rem;
  }

  h2 {
    font-family: ${theme.fonts.title};
    font-weight: ${theme.fontWeights.bold};
    color: ${theme.colors.textDark};
    margin-bottom: 1.5rem;
  }

  input {
    width: 100%;
    padding: 0.75rem 1rem;
    margin-bottom: 0.75rem;
    border-radius: 8px;
    border: none;
    font-family: ${theme.fonts.body};
    font-size: 1rem;
    background: rgba(255, 255, 255, 0.25);
    color: ${theme.colors.textDark};
    outline: none;

    ::placeholder {
      color: ${theme.colors.textDark};
      opacity: 0.7;
    }
  }

  button {
    width: 100%;
    padding: 0.75rem;
    margin-top: 0.5rem;
    border-radius: 8px;
    border: none;
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};
    font-family: ${theme.fonts.body};
    font-weight: ${theme.fontWeights.medium};
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: ${theme.colors.secondary};
    }
  }

  .links {
    margin-top: 0.25rem;
    width: 100%;
    display: flex;
    justify-content: flex-end;

    a {
      font-size: 0.875rem;
      color: ${theme.colors.highlight};
      text-decoration: none;
    }
  }

  .login {
    margin-top: 1rem;
    font-size: 0.875rem;
    color: ${theme.colors.textDark};

    a {
      color: ${theme.colors.primary};
      text-decoration: none;
      font-weight: ${theme.fontWeights.medium};
    }
  }

  .error {
    color: ${theme.colors.error};
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
  }

  .success {
    color: ${theme.colors.secondary};
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
  }
`;

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleForgotPassword = async () => {
    setError("");
    setSuccess("");

    if (!email) {
      setError("Informe o email");
      return;
    }

    try {
      await axios.post("http://localhost:3000/forgot-password", { email });
      setSuccess("Se o usuário existir, um email será enviado!");
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao solicitar recuperação de senha");
    }
  };

  return (
    <Background>
      <GlassContainer>
        <img src="/logo.png" alt="Aspect Agendamentos" />
        <h2>Recuperar senha</h2>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleForgotPassword}>Enviar</button>
        <div className="login">
          Lembrou a senha? <Link to="/login">Faça login</Link>
        </div>
      </GlassContainer>
    </Background>
  );
};
