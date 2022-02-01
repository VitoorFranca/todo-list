import { ListItemInterface, ListInterface } from "../hooks/useTodo";

export async function createTodo(title: ListItemInterface["title"]) {
  try {
    await fetch(`${process.env.REACT_APP_API_URL}/todos`, {
      method: "POST",
      body: JSON.stringify({
        title: title,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function getTodos<ListInterface>() {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/todos?_sort=id&_order=desc`
    );
    const todos = await res.json();
    return todos;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
export async function deleteTodo(id: ListItemInterface["id"]) {
  try {
    await fetch(`${process.env.REACT_APP_API_URL}/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
export async function updateTodo(
  id: ListItemInterface["id"],
  body: ListItemInterface | any
) {
  try {
    await fetch(`${process.env.REACT_APP_API_URL}/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
