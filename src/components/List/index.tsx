import React from "react";
import { Box } from "@mui/material";
import {
  ListItemInterface,
  ListInterface,
  UseTodoInterface,
} from "../../hooks/useTodo";
import { CurrentTabInterface } from "../Todos";
import ListItem from "../ListItem";

type Props = {
  currentTab: CurrentTabInterface;
  doneTask: UseTodoInterface["doneTask"];
  deleteTask: UseTodoInterface["deleteTask"];
  tasks: ListInterface;
};

export default function List({ tasks, ...other }: Props) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column-reverse" }}>
      {!!tasks.length &&
        tasks.map((item: ListItemInterface) => {
          return (
            <ListItem key={item.id} {...item} {...other}>
              {item.task}
            </ListItem>
          );
        })}
    </Box>
  );
}
