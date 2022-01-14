import React from "react";
import { Box } from "@mui/material";
import useTodo, { ListItemInterface } from "../../hooks/useTodo";
import { CurrentTabInterface } from "../Todos";
import ListItem from "../ListItem";

type Props = {
  currentTab: CurrentTabInterface;
};

export function List({ currentTab }: Props) {
  const { tasks } = useTodo();
  return (
    <Box sx={{ display: "flex", flexDirection: "column-reverse" }}>
      {tasks.map((item: ListItemInterface) => {
        return (
          <ListItem key={item.id} {...item} currentTab={currentTab}>
            {item.task}
          </ListItem>
        );
      })}
    </Box>
  );
}
