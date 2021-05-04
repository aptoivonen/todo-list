import { empty } from "../domutils/domutils";
import todoTemplate from "../../handlebars/todo-template.handlebars";
import editTodoTemplate from "../../handlebars/edittodo-template.handlebars";

class TodoView {
  constructor() {
    this.$todosRoot = document.getElementById("todos");
    this.$addTodoForm = document.getElementById("addTodoForm");
    this.$editTodoForm = document.getElementById("editTodoForm");
    this.$overlay = document.getElementById("overlay");

    this.template = todoTemplate;
    this.editTemplate = editTodoTemplate;
    this.todoList = null;
    this.todoToEdit = null;
  }

  bindAddTodoHandler(handler) {
    this.$addTodoForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(this.$addTodoForm);
      const todoData = this._formatTodoData({
        formData,
        todoListId: this.todoList.id,
      });
      if (!todoData.title) {
        return;
      }
      this.$addTodoForm.reset();
      handler(todoData);
    });
  }

  bindEditTodoHandler(handler) {
    this.$todosRoot.addEventListener("click", (event) => {
      if (this._isDeleteButtonClick(event)) {
        return;
      }
      const $li = event.target.closest("li");
      if (!$li) {
        return;
      }
      this.todoToEdit = this._findTodo($li.dataset.id);
      this.render();
    });
    this.$editTodoForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(this.$editTodoForm);
      const todoData = this._formatTodoData({
        formData,
        todoId: this.todoToEdit.id,
      });
      this.todoToEdit = null;
      if (todoData.title) {
        handler(todoData);
      }
      this.render();
    });
  }

  bindDeleteTodoHandler(handler) {
    this.$todosRoot.addEventListener("click", (event) => {
      if (!this._isDeleteButtonClick(event)) {
        return;
      }
      const $li = event.target.closest("li");
      if (!$li) {
        return;
      }
      const id = $li.dataset.id;
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
    empty(this.$editTodoForm);
    if (this.todoToEdit) {
      this.$editTodoForm.innerHTML = this.editTemplate({
        todo: this.todoToEdit,
      });
      this.$overlay.classList.add("show-flex");
    } else {
      this.$overlay.classList.remove("show-flex");
    }
  }

  _isDeleteButtonClick(event) {
    return !!event.target.closest('[data-button="todo-delete-button"]');
  }

  _findTodo(id) {
    return this.todoList.todos.find((todo) => todo.id === id);
  }

  _formatTodoData({ formData, todoId, todoListId }) {
    const formatData = (data) => {
      const trimmedData = data.trim();
      return trimmedData ? trimmedData : undefined;
    };

    let todoData = {
      title: formatData(formData.get("title")),
      description: formatData(formData.get("description")),
      priority: formatData(formData.get("priority")),
      dueDate: formatData(formData.get("dueDate"))
        ? new Date(formatData(formData.get("dueDate")))
        : null,
    };
    if (todoId) {
      todoData = { id: todoId, ...todoData };
    }
    if (todoListId) {
      todoData = { todoListId: formatData(todoListId), ...todoData };
    }
    return todoData;
  }
}

export default TodoView;
