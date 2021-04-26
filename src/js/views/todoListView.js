import { empty } from "../domutils/domutils";
import todoListTemplate from "../../handlebars/todolist-template.handlebars";

class TodoListView {
  constructor() {
    this.$todoListsRoot = document.getElementById("todoLists");
    this.$addTodoListForm = document.getElementById("addTodoListForm");
    this.$addTodoListInput = document.getElementById("addTodoListInput");

    this.template = todoListTemplate;
    this.todoLists = [];
    this.activatedTodoListId;
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

  bindEditTodoListHandler(handler) {
    return;
  }

  bindDeleteTodoListHandler(handler) {
    this.$todoListsRoot.addEventListener("click", (event) => {
      if (!this._isDeleteButtonClick(event)) {
        return;
      }
      const id = event.target.closest("li").dataset.id;
      handler(id);
    });
  }

  bindActivateTodoListHandler(handler) {
    this.$todoListsRoot.addEventListener("click", (event) => {
      if (this._isDeleteButtonClick(event)) {
        return;
      }
      const li = event.target.closest("li");
      if (!li) {
        return;
      }
      handler(li.dataset.id);
    });
  }

  setActiveTodoList(id) {
    this.activatedTodoListId = id;
    this.render();
  }

  updateTodoLists(todoLists) {
    this.todoLists = todoLists;
    this.render();
  }

  render() {
    empty(this.$todoListsRoot);
    this.$todoListsRoot.innerHTML = this.template({
      todoLists: this.todoLists,
      activatedTodoListId: this.activatedTodoListId,
    });
  }

  _isDeleteButtonClick(event) {
    return !!event.target.closest('[data-button="todo-list-delete-button"]');
  }
}

export default TodoListView;
