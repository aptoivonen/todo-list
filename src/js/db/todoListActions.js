import { v4 as uuidv4 } from "uuid";
import TodoList from "../model/todoList";
import localStorageActions from "./localStorageActions";

function findTodoList(todoListId, todoLists) {
  const todoList = todoLists.find((todoList) => todoList.id === todoListId);
  if (todoList) {
    return todoList;
  }
  return false;
}

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
    const newTodoList = new TodoList({ id: uuidv4(), title });
    this._todoLists.push(newTodoList);
    localStorageActions.save(this._todoLists);
    return newTodoList;
  },

  saveTodoList({ todoListId, title }) {
    const todoList = findTodoList(todoListId, this._todoLists);
    if (todoList) {
      Object.assign(todoList, { title });
      localStorageActions.save(this._todoLists);
      return todoList;
    }
    return false;
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
