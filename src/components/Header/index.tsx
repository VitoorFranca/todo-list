import React from "react";
import {
  Box,
  Button,
  FormControl,
  OutlinedInput,
  Typography,
  FormHelperText,
  colors
} from "@mui/material";

type Props = {
    createTask: (task: string) => void
};

function Header({ createTask }: Props) {
    const [taskText, setTaskText] = React.useState<string>('');
    const [isError, setIsError] = React.useState<boolean>(false);
    const [errorMessage, setErrorMessage] = React.useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskText(e.target.value);
    };

    function handleSubmit(e: React.SyntheticEvent){
      e.preventDefault();
      if(!taskText.trim()) {
        setIsError(true);
        setErrorMessage('O campo não pode estar vazio.');
        return;
      };
      setIsError(false);
      setErrorMessage('');
      createTask(taskText);
      setTaskText('');
    };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h1" sx={{ fontSize: 26, marginBottom: 1 }}>
        ⚛️ React ToDo
      </Typography>

      <form onSubmit={handleSubmit}>
        <FormControl
          
          sx={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', marginRight:3}}>
            <OutlinedInput sx={{ width: '100%' }} value={taskText} onChange={handleChange}  placeholder="Enter to add" />
            {isError && <FormHelperText sx={{ fontSize: 16, color: colors.red[500] }}>{errorMessage}</FormHelperText>}
          </Box>

          <Button type="submit" sx={{ height: 58 }} variant="contained">
            Add
          </Button>
        </FormControl>
      </form>
    </Box>
  );
}

export default Header;