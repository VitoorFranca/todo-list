import React from "react";
import {
  Box,
  Button,
  FormControl,
  OutlinedInput,
  Typography,
} from "@mui/material";

type Props = {
    createTask: (task: string) => void
};

function Header({ createTask }: Props) {
    const [taskText, setTaskText] = React.useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskText(e.target.value);
    };

    function handleClickCreateTask () {
        createTask(taskText);
        setTaskText('');
    };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h1" sx={{ fontSize: 26, marginBottom: 1 }}>
        ⚛️ React ToDo
      </Typography>
      <FormControl
        sx={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <OutlinedInput value={taskText} onChange={handleChange} sx={{ width: "80%" }} placeholder="Enter to add" />
        <Button sx={{ width: "15%" }} onClick={handleClickCreateTask} variant="contained">
          Add
        </Button>
      </FormControl>
    </Box>
  );
}

export default Header;