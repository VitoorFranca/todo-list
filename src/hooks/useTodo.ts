import React from "react";
import { v4 as uuidv4 } from "uuid";

export type ListItemInterface = {
  id: string;
  task: string;
  isDone: boolean;
};

export type UseTodoInterface = {
  createTask: (task: string) => void;
  doneTask: (id: string) => void;
  deleteTask: (id: string) => void;
  cleanAllCompleted: () => void;
};

export type ListInterface = ListItemInterface[];

const defaultData: ListInterface = [
  {
    id: uuidv4(),
    task: "Dar danho no cachorro",
    isDone: false,
  },
  {
    id: uuidv4(),
    task: "Lavar o carro",
    isDone: true,
  },
  {
    id: uuidv4(),
    task: "Daily 13:30",
    isDone: false,
  },
  {
    id: uuidv4(),
    task: "Varrer a casa",
    isDone: true,
  },
];

function useTodo() {
  const [tasks, setTasks] = React.useState<ListInterface>(defaultData);
  const [hasCompleteds, setHasCompleteds] = React.useState<boolean>(true);

  function createTask(task: ListItemInterface["task"]) {
    console.log("o");
    const newTask = {
      id: uuidv4(),
      task,
      isDone: false,
    };

    setTasks([...tasks, newTask]);
  }

  function doneTask(id: ListItemInterface["id"]) {
    const tasksUpdated = tasks.map((task) => {
      return {
        ...task,
        isDone: task.id === id ? !task.isDone : task.isDone,
      };
    });
    setTasks(tasksUpdated);
  }

  function deleteTask(id: ListItemInterface["id"]) {
    const tasksUpdated = tasks.filter((task) => task.id !== id);
    setTasks(tasksUpdated);
  }

  function cleanAllCompleted() {
    const cleanTasks = tasks.filter((task) => !task.isDone);
    setTasks(cleanTasks);
  }

  React.useEffect(() => {
    const completeds = tasks.filter(({ isDone }) => isDone === true);
    setHasCompleteds(!!completeds.length);
  }, [tasks]);

  return {
    tasks,
    hasCompleteds,
    createTask,
    doneTask,
    cleanAllCompleted,
    deleteTask,
  };
}

export default useTodo;
