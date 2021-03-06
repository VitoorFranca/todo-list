import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Checkbox, FormControlLabel } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { pink } from "@mui/material/colors";

import { ListItemInterface, UseTodoInterface } from "../../hooks/useTodo";
import { CurrentTabInterface } from "../Todo";

type Props = {
  children?: React.ReactNode;
  id: ListItemInterface["id"];
  completed: ListItemInterface["completed"];
  currentTab: CurrentTabInterface;
  doneTask: UseTodoInterface["doneTask"];
  deleteTask: UseTodoInterface["deleteTask"];
};

export function ListItem({
  id,
  doneTask,
  deleteTask,
  children,
  currentTab,
  completed,
}: Props) {
  const [checked, setChecked] = React.useState<boolean>(completed);
  const [index, setIndex] = React.useState<CurrentTabInterface>("todos");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    doneTask(id, completed);
  };

  const handleCLickOnDeletButton = () => {
    deleteTask(id);
  };

  React.useEffect(() => {
    if (currentTab !== "todos") {
      return setIndex(completed ? "completos" : "incompletos");
    }

    setIndex("todos");
  }, [currentTab]);

  return (
    <div
      role="tabpanel"
      hidden={currentTab !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
                  sx={{
                    textDecoration: `${completed ? "line-through" : "none"}`,
                  }}
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
