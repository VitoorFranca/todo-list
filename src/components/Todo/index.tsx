import React from "react";
import { Header } from "../Header";

import TabsHeader from "@mui/material/Tabs";
import { Paper, Box, Button, Tab, Typography } from "@mui/material";

import { useTodo } from "../../hooks/useTodo";
import { List } from "../List";

export type CurrentTabInterface = "todos" | "completos" | "incompletos";

export function Todo() {
  const {
    hasCompleteds,
    tasks,
    cleanAllCompleted,
    createTask,
    deleteTask,
    doneTask,
  } = useTodo();
  const [currentTab, setCurrentTab] =
    React.useState<CurrentTabInterface>("todos");
  const [showList, setShowList] = React.useState<boolean>(!!tasks.length);

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: CurrentTabInterface
  ) => {
    setCurrentTab(newValue);
  };

  const TabWidth = `${100 / 3}%`;

  React.useEffect(() => {
    setShowList(!!tasks.length);
  }, [tasks]);

  return (
    <Paper
      sx={{
        width: "50%",
        display: "flex",
        flexDirection: "column",
        marginTop: 20,
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
      {showList && (
        <List
          tasks={tasks}
          currentTab={currentTab}
          deleteTask={deleteTask}
          doneTask={doneTask}
        />
      )}

      {showList ? (
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
          Você não possui Tasks!
        </Typography>
      )}
    </Paper>
  );
}
