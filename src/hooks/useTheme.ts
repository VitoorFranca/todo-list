import React from "react";
import { createTheme } from "@mui/material/styles";
import { useLocalStorage } from "./useLocalStorage";

export function useTheme() {
  const [mode, setMode] = useLocalStorage<"light" | "dark">(
    "@theme.mode",
    "light",
    true
  );
  const [isDark, setIsDark] = useLocalStorage<boolean>(
    "@theme.isDark",
    mode === "dark",
    true
  );

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
