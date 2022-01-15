import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Checkbox, FormControlLabel } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { pink } from "@mui/material/colors";

import useTodo, {
  ListItemInterface,
  UseTodoInterface,
} from "../../hooks/useTodo";
import { CurrentTabInterface } from "../Todos";

interface Props {
  children?: React.ReactNode;
  id: ListItemInterface["id"];
  isDone: ListItemInterface["isDone"];
  currentTab: CurrentTabInterface;
  doneTask: UseTodoInterface["doneTask"];
  deleteTask: UseTodoInterface["deleteTask"];
}

function ListItem({
  id,
  doneTask,
  deleteTask,
  children,
  currentTab,
  isDone,
  ...other
}: Props) {
  const [checked, setChecked] = React.useState<boolean>(isDone);
  const [index, setIndex] = React.useState<CurrentTabInterface>("todos");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    doneTask(id);
  };

  const handleCLickOnDeletButton = () => {
    deleteTask(id);
  };

  React.useEffect(() => {
    if (currentTab !== "todos") {
      return setIndex(isDone ? "completos" : "incompletos");
    }

    setIndex("todos");
  }, [currentTab]);

  return (
    <div
      role="tabpanel"
      hidden={currentTab !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {currentTab === index && (
        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                  sx={{
                    color: pink[800],
                    "&.Mui-checked": {
                      color: pink[600],
                    },
                  }}
                />
              }
              label={
                <Typography
                  sx={{ textDecoration: `${isDone ? "line-through" : "none"}` }}
                >
                  {children}
                </Typography>
              }
            />
          </Box>

          <IconButton onClick={handleCLickOnDeletButton}>
            <DeleteIcon
              sx={{ color: "GrayText", cursor: "pointer", display: "flex" }}
            />
          </IconButton>
        </Box>
      )}
    </div>
  );
}

export default ListItem;
