import { Todo } from "./components/Todo";
import Box from "@mui/material/Box";
import { AppBar } from "./components/AppBar";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "./hooks/useTheme";
import CssBaseline from "@mui/material/CssBaseline";

export function App() {
  const { theme, isDark, toggleMode } = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        bgcolor="background.paper"
        style={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <AppBar isDark={isDark} toggleMode={toggleMode} />
        <Todo />
      </Box>
    </ThemeProvider>
  );
}
