import TodoListView from "./todoListView";

class View {
  constructor() {
    this.todoListView = new TodoListView(this.$todoListsRoot);
  }
}

export default View;
