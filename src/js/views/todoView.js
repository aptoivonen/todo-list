import { empty } from "../domutils/domutils";
import todoTemplate from "../../handlebars/todo-template.handlebars";

class TodoView {
  constructor() {
    this.$todosRoot = document.getElementById("todos");
    this.$addTodoForm = document.getElementById("addTodoForm");
    this.$addTodoInput = document.getElementById("addTodoInput");

    this.template = todoTemplate;
    this.todos = [];
  }

  setTodos(todos) {
    this.todos = todos;
    this.render();
  }

  render() {
    empty(this.$todosRoot);
    this.$todosRoot.innerHTML = this.template({
      todos: this.todos,
    });
  }
}

export default TodoView;
