import { Todo } from "./components/Todo";
import Papper from "@mui/material/Paper";
import { AppBar } from "./components/AppBar";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "./hooks/useTheme";

export function App() {
  const { theme, isDark, toggleMode } = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <Papper
        style={{
          width: "100%",
          minHeight: "98vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <AppBar isDark={isDark} toggleMode={toggleMode} />
        <Todo />
      </Papper>
    </ThemeProvider>
  );
}
