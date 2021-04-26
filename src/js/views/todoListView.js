import { empty } from "../domutils/domutils";
import todoListTemplate from "../../handlebars/todolist-template.handlebars";

class TodoListView {
  constructor() {
    this.$todoListsRoot = document.getElementById("todoLists");
    this.$addTodoListForm = document.getElementById("addTodoListForm");
    this.$addTodoListInput = document.getElementById("addTodoListInput");

    this.template = todoListTemplate;
    this.todoLists = [];
  }

  bindAddTodoListHandler(handler) {
    this.$addTodoListForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const value = this.$addTodoListInput.value;
      if (value) {
        handler(value);
        this.$addTodoListForm.reset();
      }
    });
  }

  bindDeleteTodoListHandler(handler) {
    this.$todoListsRoot.addEventListener("click", (event) => {
      const button = event.target.closest(
        '[data-button="todo-list-delete-button"]'
      );
      if (!button) {
        return;
      }
      const id = button.closest("li").dataset.id;
      handler(id);
    });
  }

  setTodoLists(todoLists) {
    this.todoLists = todoLists;
    this.render();
  }

  render() {
    empty(this.$todoListsRoot);
    this.$todoListsRoot.innerHTML = this.template({
      todoLists: this.todoLists,
    });
  }
}

export default TodoListView;
