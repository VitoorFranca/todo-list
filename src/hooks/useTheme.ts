import React from "react";
import { createTheme } from "@mui/material/styles";

export function useTheme() {
  const [mode, setMode] = React.useState<"light" | "dark">("light");
  const [isDark, setIsDark] = React.useState<boolean>(mode === "dark");

  const theme = createTheme({
    palette: {
      mode,
    },
  });

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  React.useEffect(() => {
    setIsDark(mode === "dark");
  }, [mode]);

  return { mode, isDark, toggleMode, theme };
}
