import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Checkbox } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  children?: React.ReactNode;
  index: number;
  value: number;
  isDone: boolean;
}

function ListItem({ children, value, isDone, index, ...other }: Props) {
  const [checked, setChecked] = React.useState(isDone);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
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
          />

          <Typography
            sx={{ textDecoration: `${isDone ? "line-through" : "none"}` }}
          >
            {children}
          </Typography>
        </Box>

        <DeleteIcon sx={{ color: 'GrayText', cursor: 'pointer', display: 'flex', }} />
        </Box>
      )}
    </div>
  );
}

export default ListItem;
