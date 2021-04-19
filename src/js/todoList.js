let todoListId = 0;

class TodoList {
  constructor(title) {
    this.title = title;
    this.id = String(todoListId++);
    this.todos = [];
  }
}

export default TodoList;
