import { empty } from "../domutils/domutils";
import todoTemplate from "../../handlebars/todo-template.handlebars";

class TodoView {
  constructor() {
    this.$todosRoot = document.getElementById("todos");
    this.$addTodoForm = document.getElementById("addTodoForm");

    this.template = todoTemplate;
    this.todoList = null;
  }

  bindAddTodoHandler(handler) {
    this.$addTodoForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(this.$addTodoForm);
      const todoData = {
        todoListId: this.todoList.id,
        title: formData.get("title"),
        description: formData.get("description"),
        priority: formData.get("priority"),
        dueDate: formData.get("dueDate"),
      };
      this.$addTodoForm.reset();
      handler(todoData);
    });
  }

  bindEditTodoHandler(handler) {}

  bindDeleteTodoHandler(handler) {
    this.$todosRoot.addEventListener("click", (event) => {
      if (!this._isDeleteButtonClick(event)) {
        return;
      }
      const id = event.target.closest("li").dataset.id;
      handler(id);
    });
  }

  updateTodoList(todoList) {
    this.todoList = todoList;
    this.render();
  }

  render() {
    empty(this.$todosRoot);
    this.$todosRoot.innerHTML = this.template({
      todos: this.todoList ? this.todoList.todos : [],
    });
  }

  _isDeleteButtonClick(event) {
    return !!event.target.closest('[data-button="todo-delete-button"]');
  }
}

export default TodoView;
