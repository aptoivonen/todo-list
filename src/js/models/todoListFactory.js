import TodoList from "./todoList";
import { v4 as uuidv4 } from "uuid";

function createTodoList({ type, title = "" }) {
  switch (type) {
    case "default":
      return new TodoList({ id: "0", title: "Home", removable: false });
    case "standard":
      return new TodoList({ id: uuidv4(), title, removable: true });
  }
}

export { createTodoList };
