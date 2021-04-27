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
    this.$todoListsRoot.addEventListener("dblclick", (event) => {
      const $title = this._getTitleElement(event);
      const $titleInput = this._getTitleInputElementInsideSameLi(event);
      if (!$title || !$titleInput) {
        return;
      }
      $title.classList.remove("show");
      $titleInput.classList.add("show");
      $titleInput.value = $title.textContent.trim();
      $titleInput.focus();
    });
    this.$todoListsRoot.addEventListener("focusout", (event) => {
      const $titleInput = this._getTitleInputElement(event);
      const $title = this._getTitleElementInsideSameLi(event);
      if (!$title || !$titleInput) {
        return;
      }
      $title.classList.add("show");
      $titleInput.classList.remove("show");
      $titleInput.value = "";
    });
    this.$todoListsRoot.addEventListener("change", (event) => {
      const $titleInput = this._getTitleInputElement(event);
      if (!$titleInput) {
        return;
      }
      const $li = event.target.closest("li");
      if (!$li) {
        return;
      }
      handler($li.dataset.id, $titleInput.value);
    });
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

  _getTitleElement(event) {
    return event.target.closest('[data-span="title"]');
  }

  _getTitleInputElement(event) {
    return event.target.closest('[data-input="todo-list-item-input"]');
  }

  _getTitleElementInsideSameLi(event) {
    const $li = event.target.closest("li");
    if (!$li) {
      return null;
    }
    return $li.querySelector('[data-span="title"]');
  }

  _getTitleInputElementInsideSameLi(event) {
    const $li = event.target.closest("li");
    if (!$li) {
      return null;
    }
    return $li.querySelector('[data-input="todo-list-item-input"]');
  }
}

export default TodoListView;
