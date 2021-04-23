import { v4 as uuidv4 } from "uuid";
import Todo from "../models/todo";
import Priority from "../models/priority";
import localStorageActions from "./localStorageActions";

function findTodo(todoId, todoLists) {
  for (const todoList of todoLists) {
    const todo = todoList.todos.find((todo) => todo.id === todoId);
    if (todo) {
      return todo;
    }
  }
  return false;
}

function findTodoList(todoListId, todoLists) {
  const todoList = todoLists.find((todoList) => todoList.id === todoListId);
  return todoList ? todoList : false;
}

function findTodoListIndexForTodo(todoId, todoLists) {
  for (const [todoListIndex, todoList] of todoLists.entries()) {
    const todo = todoList.todos.find((todo) => todo.id === todoId);
    if (todo) {
      return todoListIndex;
    }
  }
  return false;
}

const todoActions = {
  createTodo({
    todoListId = "0",
    title = "",
    description = "",
    dueDate = new Date(),
    priority = Priority.LOW,
  }) {
    const todoList = findTodoList(todoListId, this._todoLists);
    if (todoList) {
      const newTodo = new Todo({
        id: uuidv4(),
        title,
        description,
        dueDate,
        priority,
      });
      todoList.todos.push(newTodo);
      localStorageActions.save(this._todoLists);
      return newTodo;
    }
    return false;
  },

  saveTodo({ todoId, title, description, dueDate, priority }) {
    const todo = findTodo(todoId, this._todoLists);
    if (todo) {
      Object.assign(todo, { title, description, dueDate, priority });
      localStorageActions.save(this._todoLists);
      return todo;
    }
    return false;
  },

  removeTodo(todoId) {
    const todoListIndex = findTodoListIndexForTodo(todoId, this._todoLists);
    if (typeof todoListIndex === "number") {
      this._todoLists[todoListIndex].todos = this._todoLists[
        todoListIndex
      ].todos.filter((todo) => todo.id !== todoId);
      localStorageActions.save(this._todoLists);
      return true;
    }
    return false;
  },
};

export default todoActions;
