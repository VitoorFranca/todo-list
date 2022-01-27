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
  const [isLoadingTodos, setIsLoadingTodos] = React.useState<boolean>(true);

  const [isError, setIsError] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  const [hasCompleteds, setHasCompleteds] = useLocalStorage<boolean>(
    "@todos.hasCompleteds",
    true,
    false
  );

  async function getTodos() {
    setIsLoadingTodos(true);
    try {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_sort=id&_order=desc&_limit=4"
      );
      const todos = await res.json();

      setTodos(todos);
      setIsError(false);
      setIsLoadingTodos(false);

      return todos;
    } catch (error: any) {
      setIsError(true);
      setErrorMessage(error.message);
      setIsLoadingTodos(false);
    }
  }

  React.useEffect(() => {
    getTodos();
  }, []);

  async function createTask(title: ListItemInterface["title"]) {
    setIsLoadingTodos(true);
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        body: JSON.stringify({
          title: title,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const newTodo = await res.json();
      setTodos([
        ...todos,
        {
          ...newTodo,
          id: uuidv4(),
        },
      ]);

      setIsError(false);
    } catch (error: any) {
      setIsError(true);
      setErrorMessage(error.message);
    }
    setIsLoadingTodos(false);
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
    setErrorMessage,
    isLoadingTodos,
    isError,
    errorMessage,
    todos,
    hasCompleteds,
    createTask,
    doneTask,
    cleanAllCompleted,
    deleteTask,
  };
}
