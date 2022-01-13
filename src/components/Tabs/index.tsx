import React from "react";
import TabItem from "../ListItem";
import Header from "../Header";

import TabsHeader from "@mui/material/Tabs";
import { Box, Tab } from "@mui/material";


type ListItem = {
  id: number;
  task: string;
  isDone: boolean;
};

type Props = {
  list: ListItem[];
};

function Tabs({ list }: Props) {

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
        <Header />
        <TabsHeader
          sx={{ width: "100%" }}
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab sx={{ width: TabWidth }} label="Todos" {...a11yProps(0)} />
          <Tab sx={{ width: TabWidth }} label="Completo" {...a11yProps(1)} />
          <Tab sx={{ width: TabWidth }} label="Incompleto" {...a11yProps(2)} />
        </TabsHeader>
      </Box>
      <Box>
        {list && list.map(({ id, task, isDone }, i) => {
          let index: number = 0;
          if (value) index = isDone ? 1 : 2;

          return (
            <TabItem key={id} isDone={isDone} value={value} index={index}>
              {task}
            </TabItem>
          );
        })}
      </Box>
    </Box>
  );
}

export default Tabs;
