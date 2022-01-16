import React from "react";
import { Box, Toolbar, IconButton, Switch } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AppBarMui from "@mui/material/AppBar";

export function AppBar() {
  const [auth, setAuth] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };
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
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
              color="secondary"
            />
          </Box>
        </Toolbar>
      </AppBarMui>
    </Box>
  );
}
