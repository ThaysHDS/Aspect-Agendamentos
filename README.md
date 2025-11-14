# Aspect‑Agendamentos

Aplicação web em desenvolvimento para gerenciamento de agendamentos de exames.
O sistema permite visualizar exames disponíveis, adicionar novos agendamentos e removê-los de forma simples e intuitiva.

## 🚧 Status do Projeto
⚠️ Este projeto ainda está em desenvolvimento ativo. Novas funcionalidades estão sendo implementadas, e partes do sistema podem sofrer alterações conforme o projeto evolui.

## Objetivo
Fornecer uma solução completa e funcional para o gerenciamento de agendamentos de exames, desde a listagem de exames disponíveis até o controle de horários e exclusão de registros. Até o momento, as principais funcionalidades já foram implementadas, mas o sistema continua sendo aprimorado e refinado constantemente.

## Funcionalidades Implementadas

### 1. Autenticação e Acesso
- **Página de Login**  
  - Permite autenticação de usuários com validação de credenciais. 
  - Possui sistema de cadastro de novos usuários.
  - Envio automatizado de e-mail para recuperação de senha.
- **Landing Page (Experimental)**
  - Página inicial simples, servindo como ponto de acesso ao login.
  - Será aprimorada futuramente com layout e informações institucionais.

### 2. Dashboard
- Área principal do sistema, atualmente em desenvolvimento, reunindo as funcionalidades centrais de gerenciamento.
- **Gerenciamento de Exames**  
  - Visualização dos tipos de exames disponíveis para agendamento.
  - Exibição de detalhes como:
    - Nome do exame
    - Especialidade médica

- **Agendamento de Exames**
  - Adição de novos agendamentos com:
    - Tipo de exame  
    - Data e hora disponíveis
    - Informações adicionais
  - Visualização de todos os agendamentos realizados.
  - Exclusão de agendamentos existentes.

## Tecnologias Utilizadas

### Frontend
- React + TypeScript – Interface e tipagem
- React Router – Navegação e rotas protegidas
- Styled Components – CSS-in-JS para temas e estilos
- Tailwind CSS – Framework utilitário para estilos rápidos
- React Calendar & React Day Picker – Componentes de calendário
- React Context API – Gerenciamento de estado global
- Fetch API – Comunicação com backend REST
- Vite – Bundler e servidor de desenvolvimento
- PostCSS – Processamento de CSS integrado ao Tailwind

### Backend
- Node.js + Express – Servidor e APIs REST
- JWT – Autenticação via token
- bcrypt – Hash de senhas
- TypeORM – ORM para banco de dados
- CORS – Permite comunicação entre frontend e backend

### Banco de Dados
- MySQL – Armazenamento de usuários, exames e agendamentos

## Como Executar Localmente
1. Clone este repositório:  
   ```bash
   git clone https://github.com/ThaysHDS/Aspect-Agendamentos.git
2. Acesse a pasta do projeto:
cd Aspect-Agendamentos

3. Instale as dependências:
npm install

4. Execute o servidor de desenvolvimento:
npm start

5. Acesse em seu navegador:
http://localhost:3000

## Próximos Passos
- Finalizar desenvolvimento completo da Dashboard
- Melhorar o design e experiência do usuário da Landing Page
- Implementar autenticação com JWT
- Adicionar validação de formulários e feedback visual
- Criar notificações e confirmações de agendamento
- Implementar níveis de acesso (usuário comum / administrador)
- Publicar uma versão beta online para testes
- Escrever testes automatizados (frontend e backend)
