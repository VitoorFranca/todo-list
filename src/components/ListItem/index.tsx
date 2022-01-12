import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


interface Props {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function ListItem ({ children, value, index, ...other }: Props) {
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
};

export default ListItem;