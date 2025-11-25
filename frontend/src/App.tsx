import AppRoutes from "./routes/AppRoutes";
import { AppProvider } from "./context/AppContext";
import { DashboardProvider } from "./context/DashboardContext";
import { GlobalStyle } from "./styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <DashboardProvider>
          <GlobalStyle />
          <AppRoutes />
        </DashboardProvider>
      </AppProvider>
    </ThemeProvider>
  );
}



