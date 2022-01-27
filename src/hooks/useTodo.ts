import React from "react";
import { useLocalStorage } from "./useLocalStorage";
import { v4 as uuidv4 } from "uuid";

export type ListItemInterface = {
  id: string;
  title: string;
  completed: boolean;
};

export type UseTodoInterface = {
  createTask: (title: string) => void;
  doneTask: (id: string) => void;
  deleteTask: (id: string) => void;
  cleanAllCompleted: () => void;
};

export type ListInterface = ListItemInterface[];

export function useTodo() {
  const [todos, setTodos] = React.useState<ListInterface>([]);
  const [hasCompleteds, setHasCompleteds] = useLocalStorage<boolean>(
    "@todos.hasCompleteds",
    true,
    false
  );

  async function getTodos() {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/todos?_sort=id&_order=desc&_limit=4"
    );
    return res.json();
  }

  React.useEffect(() => {
    (async () => {
      setTodos(await getTodos());
    })();
  }, []);

  function createTask(title: ListItemInterface["title"]) {
    const newTask = {
      id: uuidv4(),
      title,
      completed: false,
    };

    setTodos([...todos, newTask]);
  }

  function doneTask(id: ListItemInterface["id"]) {
    const todoUpdated = todos.map((todo) => {
      return {
        ...todo,
        completed: todo.id === id ? !todo.completed : todo.completed,
      };
    });
    setTodos(todoUpdated);
  }

  function deleteTask(id: ListItemInterface["id"]) {
    const todosUpdated = todos.filter((task) => task.id !== id);
    setTodos(todosUpdated);
  }

  function cleanAllCompleted() {
    const cleanTasks = todos.filter((todo) => !todo.completed);
    setTodos(cleanTasks);
  }

  React.useEffect(() => {
    const completeds = todos.filter(({ completed }) => completed === true);
    setHasCompleteds(!!completeds.length);
  }, [todos]);

  return {
    todos,
    hasCompleteds,
    createTask,
    doneTask,
    cleanAllCompleted,
    deleteTask,
  };
}
