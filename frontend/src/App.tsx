import AppRoutes from "./routes/AppRoutes";
import { AppProvider } from "./context/AppContext";
import { DashboardProvider } from "./context/DashboardContext";
import { GlobalStyle } from "./styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <DashboardProvider>
          <GlobalStyle />
          <Dashboard userId={1} userName="Thay" />
          <AppRoutes />
        </DashboardProvider>
      </AppProvider>
    </ThemeProvider>
  );
}

