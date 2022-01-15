import React from "react";
import Header from "../Header";

import TabsHeader from "@mui/material/Tabs";
import { Box, Button, Tab, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

import useTodo from "../../hooks/useTodo";
import List from "../List";

export type CurrentTabInterface = "todos" | "completos" | "incompletos";

function Tabs() {
  const [currentTab, setCurrentTab] =
    React.useState<CurrentTabInterface>("todos");

  const {
    hasCompleteds,
    tasks,
    cleanAllCompleted,
    createTask,
    deleteTask,
    doneTask,
  } = useTodo();

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: CurrentTabInterface
  ) => {
    setCurrentTab(newValue);
  };

  const TabWidth = `${100 / 3}%`;

  return (
    <Box
      sx={{
        width: "40%",
        border: 1,
        borderRadius: 3,
        padding: 2,
        borderColor: "divider",
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
      {!!tasks.length && (
        <List
          tasks={tasks}
          currentTab={currentTab}
          deleteTask={deleteTask}
          doneTask={doneTask}
        />
      )}

      {!!tasks.length ? (
        hasCompleteds &&
        currentTab != "incompletos" && (
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
            color: grey[800],
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
    </Box>
  );
}

export default Tabs;
