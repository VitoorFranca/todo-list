import { Box, Toolbar, IconButton } from "@mui/material";
import AppBarMui from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import { Brightness4, Brightness7 } from "@mui/icons-material";

type Props = {
  toggleMode: () => void;
  isDark: boolean;
};

export function AppBar({ toggleMode, isDark }: Props) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <AppBarMui>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton sx={{ ml: 1 }} onClick={toggleMode} color="inherit">
            {isDark ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
      </AppBarMui>
    </Box>
  );
}
