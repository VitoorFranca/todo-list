import { Box } from "@mui/material";
import {
  ListItemInterface,
  ListInterface,
  UseTodoInterface,
} from "../../hooks/useTodo";
import { CurrentTabInterface } from "../Todo";
import { ListItem } from "../ListItem";

type Props = {
  currentTab: CurrentTabInterface;
  doneTask: UseTodoInterface["doneTask"];
  deleteTask: UseTodoInterface["deleteTask"];
  todos: ListInterface;
};

export function List({ todos, ...other }: Props) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column-reverse" }}>
      {!!todos.length &&
        todos.map((item: ListItemInterface) => {
          return (
            <ListItem key={item.id} {...item} {...other}>
              {item.title}
            </ListItem>
          );
        })}
    </Box>
  );
}
