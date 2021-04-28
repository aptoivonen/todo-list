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
      const formatData = (data) => {
        const trimmedData = data.trim();
        return trimmedData ? trimmedData : undefined;
      };

      event.preventDefault();
      const formData = new FormData(this.$addTodoForm);
      const todoData = {
        todoListId: formatData(this.todoList.id),
        title: formatData(formData.get("title")),
        description: formatData(formData.get("description")),
        priority: formatData(formData.get("priority")),
        dueDate: formatData(formData.get("dueDate"))
          ? new Date(formatData(formData.get("dueDate")))
          : null,
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
