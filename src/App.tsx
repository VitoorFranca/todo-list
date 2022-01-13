import * as React from 'react';
import Tabs from './components/Tabs';
import Box from '@mui/material/Box';

import useTodo from './hooks/useTodo';

function App() {
  const { cleanAllCompleted, hasCompleteds, createTask, deleteTask, doneTask, tasks } = useTodo();

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