import { Todo } from "./components/Todo";
import Box from "@mui/material/Box";

export function App() {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Todo />
    </Box>
  );
}
