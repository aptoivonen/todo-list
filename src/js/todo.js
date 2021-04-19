import Priority from "./priority";

let todoId = 0;

class Todo {
  constructor({
    title = "",
    description = "",
    dueDate = new Date(),
    priority = Priority.LOW,
  }) {
    this.id = String(todoId++);
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

export default Todo;
