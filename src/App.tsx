import * as React from 'react';
import Tabs from './components/Tabs';
import Box from '@mui/material/Box';
import useLocalStorage from './hooks/useLocalStorage'

type ListItem = {
  id: number,
  task: string,
  isDone: boolean
};

type List = ListItem[];

function App() {

  const [tasks, setTasks] = React.useState([]);

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Tabs list={tasks} />
    </Box>
  );
}

export default App;