import * as React from 'react';
import Tabs from './components/Tabs';
import Box from '@mui/material/Box';

type ListItem = {
  id: number,
  task: string,
  isDone: boolean
};

type List = ListItem[];

function App() {

  const [tasks, setTasks] = React.useState<List>([]);
  const [hasCompleteds, setHasCompleteds] = React.useState<boolean>(false);

  function createTask(task: string) {
    const newTask = {
      id: tasks[tasks.length - 1] ? tasks[tasks.length - 1].id + 1 : 1,
      task,
      isDone: false,
    };

    setTasks([...tasks, newTask]);
  };

  function doneTask (id: number) {
    const tasksUpdated = tasks.map(task => {
      if(task.id === id)
        task.isDone = !task.isDone;

      return task;
    });
    setTasks(tasksUpdated);
  };

  function deleteTask (id: number) {
    const tasksUpdated = tasks.filter(task => task.id != id);
    setTasks(tasksUpdated);
  };

  function cleanAllCompleted(){
    const cleanTasks = tasks.filter(task => !task.isDone);
    setTasks(cleanTasks);
  };

  React.useEffect(() => {
    tasks.every(({isDone}, index) => {
      
      if (isDone){
        setHasCompleteds(true);
        return false;
      }
      else {
        setHasCompleteds(false);
        return true;
     }
    });
  }, [tasks]);

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Tabs
        createTask={createTask}
        doneTask={doneTask}
        list={tasks}
        cleanAllCompleted={cleanAllCompleted}
        deleteTask={deleteTask}
        hasCompleteds={hasCompleteds}
      />
    </Box>
  );
}

export default App;