import { v4 as uuidv4 } from "uuid";
import TodoList from "../model/todoList";
import localStorageActions from "./localStorageActions";

const todoListActions = {
  initTodoLists() {
    const fetchedTodoLists = localStorageActions.fetch();
    return fetchedTodoLists
      ? fetchedTodoLists
      : [new TodoList({ id: "0", title: "default" })];
  },

  getTodoLists() {
    return this._todoLists;
  },

  createTodoList(title) {
    this._todoLists.push(new TodoList({ id: uuidv4(), title }));
    localStorageActions.save(this._todoLists);
    return true;
  },

  removeTodoList(todoListId) {
    if (todoListId === "0") {
      return false;
    }
    this._todoLists = this._todoLists.filter(
      (todoList) => todoList.id !== todoListId
    );
    localStorageActions.save(this._todoLists);
    return true;
  },
};

export default todoListActions;
