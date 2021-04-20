import Priority from "./priority";
class Todo {
  constructor({
    id,
    title = "",
    description = "",
    dueDate = new Date(),
    priority = Priority.LOW,
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

export default Todo;
