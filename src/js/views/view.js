import TodoListView from "./todoListView";
import TodoView from "./todoView";

class View {
  constructor() {
    this.todoListView = new TodoListView();
    this.todoView = new TodoView();
  }
}

export default View;
