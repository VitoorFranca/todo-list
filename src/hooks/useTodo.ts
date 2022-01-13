import React from 'react';
import { v4 as uuidv4 } from 'uuid';

type ListItem = {
    id: string,
    task: string,
    isDone: boolean
  };
  
  type List = ListItem[];

  const defaultData: List = [
      {
          id: uuidv4(),
          task: 'Dar danho no cachorro',
          isDone: false
      },
      {
          id: uuidv4(),
          task: 'Lavar o carro',
          isDone: true
      },
      {
          id: uuidv4(),
          task: 'Daily 13:30',
          isDone: false
      },
      {
          id: uuidv4(),
          task: 'Varrer a casa',
          isDone: true
      }
  ];

function useTodo () {
    const [tasks, setTasks] = React.useState<List>(defaultData);
    const [hasCompleteds, setHasCompleteds] = React.useState<boolean>(false);
  
    function createTask(task: string) {
      const newTask = {
        id: uuidv4(),
        task,
        isDone: false,
      };
  
      setTasks([...tasks, newTask]);
    };
  
    function doneTask (id: string) {
      const tasksUpdated = tasks.map(task => {
        if(task.id === id){
          task.isDone = !task.isDone;
        }
  
        return task;
      });
      setTasks(tasksUpdated);
    };
  
    function deleteTask (id: string) {
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