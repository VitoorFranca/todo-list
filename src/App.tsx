import * as React from 'react';
import Tabs from './components/Tabs';
import Box from '@mui/material/Box';
import TasksProvider from './context/Tasks';
import { useTasks } from './context/Tasks';

type ListItem = {
  id: number,
  task: string,
  isDone: boolean
};

type List = ListItem[];

function App() {
  const { tasks } = useTasks();
  console.log(tasks)

  return (
    <TasksProvider>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Tabs list={tasks} />
      </Box>
    </TasksProvider>
  );
}

export default App;