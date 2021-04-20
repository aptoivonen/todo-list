class TodoList {
  constructor({ id, title = "" }) {
    this.id = id;
    this.title = title;
    this.todos = [];
  }
}

export default TodoList;
