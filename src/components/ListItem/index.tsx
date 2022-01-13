import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Checkbox } from "@mui/material";

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
            p: 3,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
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
      )}
    </div>
  );
}

export default ListItem;
