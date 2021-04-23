class TodoList {
  constructor({ id, title, removable }) {
    this.id = id;
    this.title = title;
    this.removable = removable;
    this.todos = [];
  }
}

export default TodoList;
