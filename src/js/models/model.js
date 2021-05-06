import { createTodoList } from "./todoListFactory";
import { createTodo } from "./todoFactory";
import { replacer, reviver } from "./json";

const LOCALSTORAGE_KEY = "todoLists";

class Model {
  constructor() {
    this._todoLists = JSON.parse(
      localStorage.getItem(LOCALSTORAGE_KEY),
      reviver
    ) || [createTodoList({ type: "default" })];
  }

  bindTodoListsChanged(callback) {
    this.onTodoListsChanged = callback;
  }

  getTodoLists() {
    return this._todoLists;
  }

  addTodoList(title) {
    const newTodoList = createTodoList({ type: "standard", title });
    this._todoLists.push(newTodoList);
    this._commit(this._todoLists);
  }

  editTodoList(id, title) {
    if (!title) {
      return;
    }
    const todoList = this._findTodoList(id);
    if (todoList) {
      Object.assign(todoList, { title });
      this._commit(this._todoLists);
    }
  }

  deleteTodoList(id) {
    const todoList = this._findTodoList(id);
    if (!todoList) {
      return;
    }
    if (!todoList.removable) {
      return;
    }
    this._todoLists = this._todoLists.filter((todoList) => todoList.id !== id);
    this._commit(this._todoLists);
  }

  addTodo({ todoListId, title, description, dueDate, priority }) {
    const todoListToAddTo = this._findTodoList(todoListId);
    if (!todoListToAddTo) {
      return;
    }
    const newTodo = createTodo({ title, description, dueDate, priority });
    todoListToAddTo.todos.push(newTodo);
    this._commit(this._todoLists);
  }

  editTodo({ id, title, description, dueDate, priority }) {
    const todo = this._findTodo(id);
    if (todo) {
      todo.title = title !== undefined ? title : todo.title;
      todo.description =
        description !== undefined ? description : todo.description;
      todo.dueDate = dueDate !== undefined ? dueDate : todo.dueDate;
      todo.priority = priority !== undefined ? priority : todo.priority;
      this._commit(this._todoLists);
    }
  }

  deleteTodo(id) {
    const todoList = this._findTodoListForTodo(id);
    if (todoList) {
      todoList.todos = todoList.todos.filter((todo) => todo.id !== id);
      this._commit(this._todoLists);
    }
  }

  _commit(todoLists) {
    this.onTodoListsChanged(todoLists);
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(todoLists, replacer));
  }

  _findTodoList(todoListId) {
    return this._todoLists.find((todoList) => todoList.id === todoListId);
  }

  _findTodo(todoId) {
    for (const todoList of this._todoLists) {
      const todo = todoList.todos.find((todo) => todo.id === todoId);
      if (todo) {
        return todo;
      }
    }
    return null;
  }

  _findTodoListForTodo(todoId) {
    for (const todoList of this._todoLists) {
      const todo = todoList.todos.find((todo) => todo.id === todoId);
      if (todo) {
        return todoList;
      }
    }
    return null;
  }
}

export default Model;
