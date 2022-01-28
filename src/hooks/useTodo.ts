import React from "react";
import { useLocalStorage } from "./useLocalStorage";
import { getTodos, createTodo, deleteTodo, updateTodo } from "../services/todo";
import { v4 as uuidv4 } from "uuid";

export type ListItemInterface = {
  id: number;
  title: string;
  completed: boolean;
};

export type UseTodoInterface = {
  createTask: (title: ListItemInterface["title"]) => void;
  doneTask: (id: ListItemInterface["id"]) => void;
  deleteTask: (id: ListItemInterface["id"]) => void;
  cleanAllCompleted: () => void;
};

export type Status = "loading" | "error" | "completed";

export type ListInterface = ListItemInterface[];

export function useTodo() {
  const [status, setStatus] = React.useState<Status>("loading");
  const [todos, setTodos] = React.useState<ListInterface>([]);

  const [errorMessage, setErrorMessage] = React.useState("");

  const [hasCompleteds, setHasCompleteds] = useLocalStorage<boolean>(
    "@todos.hasCompleteds",
    true,
    false
  );

  React.useEffect(() => {
    getTodos()
      .then((todos) => {
        setTodos(todos);
        setStatus("completed");
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setStatus("error");
      });
  }, []);

  async function createTask(title: ListItemInterface["title"]) {
    setStatus("loading");

    try {
      await createTodo(title);
      setTodos(await getTodos());
      setStatus("completed");
    } catch (err: any) {
      setErrorMessage(err.message);
      setStatus("error");
    }
  }

  async function doneTask(
    id: ListItemInterface["id"],
    value: ListItemInterface["completed"]
  ) {
    try {
      await updateTodo(id, { completed: !value });
      setTodos(await getTodos());
      setStatus("completed");
    } catch (err: any) {
      setErrorMessage(err.message);
      setStatus("error");
    }
  }

  async function deleteTask(id: ListItemInterface["id"]) {
    setStatus("loading");

    try {
      await deleteTodo(id);
      setTodos(await getTodos());
      setStatus("completed");
    } catch (err: any) {
      setErrorMessage(err.message);
      setStatus("error");
    }
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
    status,
    setErrorMessage,
    isLoadingTodos: status === "loading",
    isError: status === "error",
    errorMessage,
    todos,
    hasCompleteds,
    createTask,
    doneTask,
    cleanAllCompleted,
    deleteTask,
  };
}
