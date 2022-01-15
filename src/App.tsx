import Tabs from "./components/Todos";
import Box from "@mui/material/Box";

function App() {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Tabs />
    </Box>
  );
}

export default App;
