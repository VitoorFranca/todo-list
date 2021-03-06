import React from "react";
import { Header } from "../Header";

import TabsHeader from "@mui/material/Tabs";
import {
  Paper,
  Box,
  Button,
  Tab,
  Typography,
  CircularProgress,
} from "@mui/material";

import { useTodo } from "../../hooks/useTodo";
import { List } from "../List";

export type CurrentTabInterface = "todos" | "completos" | "incompletos";

export function Todo() {
  const {
    hasCompleteds,
    todos,
    cleanAllCompleted,
    createTask,
    deleteTask,
    doneTask,
    errorMessage,
    isError,
    isLoadingTodos,
  } = useTodo();
  const [currentTab, setCurrentTab] =
    React.useState<CurrentTabInterface>("todos");
  const [showList, setShowList] = React.useState<boolean>(!!todos.length);

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: CurrentTabInterface
  ) => {
    setCurrentTab(newValue);
  };

  const TabWidth = `${100 / 3}%`;

  React.useEffect(() => {
    setShowList(!!todos.length);
  }, [todos]);

  return (
    <Paper
      sx={{
        width: "50%",
        display: "flex",
        flexDirection: "column",
        marginTop: 10,
        padding: 3,
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Header createTask={createTask} />
        <TabsHeader
          sx={{ width: "100%" }}
          value={currentTab}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab sx={{ width: TabWidth }} label="Todos" value="todos" />
          <Tab sx={{ width: TabWidth }} label="Completo" value="completos" />
          <Tab
            sx={{ width: TabWidth }}
            label="Incompleto"
            value="incompletos"
          />
        </TabsHeader>
      </Box>
      {isLoadingTodos && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}

      {showList && !isLoadingTodos && (
        <List
          todos={todos}
          currentTab={currentTab}
          deleteTask={deleteTask}
          doneTask={doneTask}
        />
      )}

      {showList && !isLoadingTodos ? (
        hasCompleteds &&
        currentTab !== "incompletos" && (
          <Button
            sx={{ width: "100%" }}
            onClick={cleanAllCompleted}
            variant="contained"
          >
            Limpar completos
          </Button>
        )
      ) : (
        <Typography
          sx={{
            color: "GrayText.primary",
            fontFamily: "Monospace",
            fontSize: "h6.fontSize",
            textAlign: "center",
            marginTop: 3,
            fontWeight: "bold",
          }}
        >
          {errorMessage}
        </Typography>
      )}
    </Paper>
  );
}
