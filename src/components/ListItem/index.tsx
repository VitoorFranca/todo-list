import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Checkbox } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { pink } from '@mui/material/colors';

interface Props {
  children?: React.ReactNode;
  id: string;
  index: number;
  value: number;
  isDone: boolean;
  doneTask: (id: string) => void;
  deleteTask: (id: string) => void;
}

function ListItem({ id, deleteTask, children, value, isDone, doneTask, index, ...other }: Props) {
  const [checked, setChecked] = React.useState(isDone);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    doneTask(id);
  };

  const handleCLickOnDeletButton = () => {
      deleteTask(id);
  }; 

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: "row",
            alignItems: "center",
          }}
        >
        
        <Box sx={{
            display: 'flex',
            flexDirection: "row",
            alignItems: "center",
            width: '100%'
        }}>
          <Checkbox
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
            sx={{
              color: pink[800],
              '&.Mui-checked': {
                color: pink[600],
              }}}
          />

          <Typography

            sx={{ textDecoration: `${isDone ? "line-through" : "none"}` }}
          >
            {children}
          </Typography>
        </Box>

        <IconButton>
          <DeleteIcon onClick={handleCLickOnDeletButton} sx={{ color: 'GrayText', cursor: 'pointer', display: 'flex', }} />
        </IconButton>
        
        </Box>
      )}
    </div>
  );
}

export default ListItem;
