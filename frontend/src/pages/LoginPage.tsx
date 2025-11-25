import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { useApp } from "../context/AppContext";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeLogo = keyframes`
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
`;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url('/login-bg.webp');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} 1s ease-out;
`;

const GlassContainer = styled.div`
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 3rem 2rem;
  max-width: 400px;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.colors.textDark};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.8s ease-out;

  img {
    width: 120px;
    margin-bottom: 1rem;
    animation: ${fadeLogo} 1.2s ease-in-out;
  }

  h2 {
    font-family: ${({ theme }) => theme.fonts.title};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.5rem;
    margin-bottom: 1.2rem;
    text-align: center;
  }

  input {
    width: 100%;
    padding: 0.75rem 1rem;
    margin-bottom: 0.75rem;
    border-radius: 8px;
    border: none;
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 1rem;
    outline: none;
    background-color: rgba(255, 255, 255, 0.85);
    color: ${({ theme }) => theme.colors.textDark};
  }

  .links {
    width: 100%;
    text-align: right;
    margin-top: 0.3rem;
    margin-bottom: 1rem;

    a {
      color: ${({ theme }) => theme.colors.textDark};
      text-decoration: none;
      font-size: 0.85rem;
      font-weight: ${({ theme }) => theme.fontWeights.medium};

      &:hover {
        color: ${({ theme }) => theme.colors.primary};
      }
    }
  }

  button {
    width: 100%;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    border: none;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    font-family: ${({ theme }) => theme.fonts.body};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    cursor: pointer;
    transition: background 0.3s, transform 0.2s;

    &:hover {
      background-color: ${({ theme }) => theme.colors.secondary};
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }
  }

  .signup {
    margin-top: 1.2rem;
    text-align: center;
    font-size: 0.9rem;

    a {
      color: ${({ theme }) => theme.colors.primary};
      font-weight: ${({ theme }) => theme.fontWeights.bold};
      text-decoration: none;

      &:hover {
        color: ${({ theme }) => theme.colors.secondary};
      }
    }
  }

  .error {
    width: 100%;
    background-color: ${({ theme }) => theme.colors.error};
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    margin-bottom: 0.75rem;
    text-align: center;
    font-size: 0.9rem;
  }
`;

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useApp();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setError("");

      const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: senha }),
      });

      const data = await res.json();
      console.log("Login bem-sucedido:", data);

      if (res.ok) {
        // Backend retorna apenas token, então criamos o usuário manualmente
        const user = { email }; // só com email, sem ID
        setUser(user);

        // Salva token no localStorage
        localStorage.setItem("token", data.token);

        navigate("/dashboard");
      } else {
        setError(data.message || "Email ou senha inválidos");
      }
    } catch {
      setError("Erro ao conectar com o servidor");
    }
  };

  return (
    <Background>
      <GlassContainer>
        <img src="/logo.png" alt="Aspect Agendamentos" />
        <h2>Login</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          style={{ width: "100%" }}
        >
          {error && <div className="error">{error}</div>}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            autoComplete="current-password"
          />

          <div className="links">
            <Link to="/forgot-password">Esqueci minha senha</Link>
          </div>

          <button type="submit">Entrar</button>
        </form>

        <div className="signup">
          Não é membro? <Link to="/register">Cadastre-se</Link>
        </div>
      </GlassContainer>
    </Background>
  );
}


