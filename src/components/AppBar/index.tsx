import React from "react";
import { Box, Toolbar, IconButton, Switch } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AppBarMui from "@mui/material/AppBar";
import { useTheme } from "../../hooks/useTheme";

type Props = {
  toggleMode: () => void;
  isDark: boolean;
};

export function AppBar({ toggleMode, isDark }: Props) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <AppBarMui>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Box>
            <Switch
              checked={isDark}
              onChange={toggleMode}
              aria-label="login switch"
              color="secondary"
            />
          </Box>
        </Toolbar>
      </AppBarMui>
    </Box>
  );
}
