import React from "react";
import TabItem from "../ListItem";
import Header from "../Header";

import TabsHeader from "@mui/material/Tabs";
import { Box, Button, Tab } from "@mui/material";

type ListItem = {
  id: number;
  task: string;
  isDone: boolean;
};

type TabsProps = {
  list: ListItem[];
  createTask: (task: string) => void;
  doneTask: (id: number) => void;
  deleteTask: (id: number) => void;
  cleanAllCompleted: () => void;
  hasCompleteds: boolean;
};

function Tabs({
  list,
  deleteTask,
  cleanAllCompleted,
  hasCompleteds,
  createTask,
  doneTask,
}: TabsProps) {
  const [currentTab, setCurrentTab] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

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
          <Tab sx={{ width: TabWidth }} label="Todos" {...a11yProps(0)} />
          <Tab sx={{ width: TabWidth }} label="Completo" {...a11yProps(1)} />
          <Tab sx={{ width: TabWidth }} label="Incompleto" {...a11yProps(2)} />
        </TabsHeader>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column-reverse" }}>
        {list.map(({ id, task, isDone }, i) => {
          let index: number = 0;
          if (currentTab) index = isDone ? 1 : 2;

          return (
            <TabItem
              key={id}
              isDone={isDone}
              id={id}
              value={currentTab}
              doneTask={doneTask}
              deleteTask={deleteTask}
              index={index}
            >
              {task}
            </TabItem>
          );
        })}
      </Box>
      {!!list.length && hasCompleteds && currentTab != 2 && (
        <Button
          sx={{ width: "100%" }}
          onClick={cleanAllCompleted}
          variant="contained"
        >
          Limpar completos
        </Button>
      )}
    </Box>
  );
}

export default Tabs;
