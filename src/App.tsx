import * as React from "react";
import Tabs from "./components/Todos";
import Box from "@mui/material/Box";

import useTodo from "./hooks/useTodo";

function App() {
  const { createTask } = useTodo();

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Tabs createTask={createTask} />
    </Box>
  );
}

export default App;
