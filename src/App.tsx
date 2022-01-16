import { Todo } from "./components/Todo";
import Papper from "@mui/material/Paper";
import { AppBar } from "./components/AppBar";

export function App() {
  return (
    <Papper
      style={{
        width: "100%",
        minHeight: "98vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <AppBar />
      <Todo />
    </Papper>
  );
}
