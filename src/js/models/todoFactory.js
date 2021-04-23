import Todo from "./todo";
import Priority from "./priority";
import { v4 as uuidv4 } from "uuid";

function createTodo({
  title = "",
  description = "",
  dueDate = new Date(),
  priority = Priority.LOW,
}) {
  return new Todo({ id: uuidv4(), title, description, dueDate, priority });
}

export { createTodo };
