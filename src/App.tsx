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

  const [tasks, setTasks] = React.useState<List>([]);

  function createTask(task: string) {
    const newTask = {
      id: tasks[tasks.length - 1] ? tasks[tasks.length - 1].id + 1 : 1,
      task,
      isDone: false,
    };

    setTasks([...tasks, newTask]);
  };

  function doneTask (id: number) {
    const item = tasks[id - 1];
    console.log(item);
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Tabs
        createTask={createTask}
        doneTask={doneTask}
        list={tasks}
      />
    </Box>
  );
}

export default App;