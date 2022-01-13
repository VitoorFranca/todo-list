import React from 'react';

let id: number = 0;

type ListItem = {
    id: number,
    task: string,
    isDone: boolean
  };
  
  type List = ListItem[];

function useTodo () {
    const [tasks, setTasks] = React.useState<List>([]);
    const [hasCompleteds, setHasCompleteds] = React.useState<boolean>(false);
  
    function createTask(task: string) {
      const newTask = {
        id: id++,
        task,
        isDone: false,
      };
  
      setTasks([...tasks, newTask]);
    };
  
    function doneTask (id: number) {
      const tasksUpdated = tasks.map(task => {
        if(task.id === id){
          task.isDone = !task.isDone;
        }
  
        return task;
      });
      setTasks(tasksUpdated);
    };
  
    function deleteTask (id: number) {
      const tasksUpdated = tasks.filter(task => task.id !== id);
      setTasks(tasksUpdated);
    };
  
    function cleanAllCompleted(){
      const cleanTasks = tasks.filter(task => !task.isDone);
      setTasks(cleanTasks);
    };
  
    React.useEffect(() => {
      tasks.every(({isDone}) => {
        
        if (isDone){
          setHasCompleteds(true);
          return false;
        }
        setHasCompleteds(false);
        return true;
      });
    }, [tasks]);

    return {tasks, hasCompleteds, createTask, doneTask, cleanAllCompleted, deleteTask};
};

export default useTodo;