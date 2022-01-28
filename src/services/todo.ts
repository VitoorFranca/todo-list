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
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function getTodos<ListInterface>() {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/todos?_sort=id&_order=desc`
    );
    const todos = await res.json();
    return todos;
  } catch (error: any) {
    throw new Error(error.message);
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
  } catch (err) {
    throw new Error("Error" + err);
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
  } catch (err: any) {
    throw new Error(err.message);
  }
}
