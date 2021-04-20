import todoDb from "../db/todoDb";
import pubsub from "../pubsub/pubsub";

function logTodo(todo) {
  console.log("todo changed:", todo);
}

function logTodoList(todoList) {
  console.log("todoList changed:", todoList);
}

function initLog({ todoLists }) {
  console.table("init log:", todoLists);
}

function createTodo({ title, description, dueDate, priority }) {
  const result = todoDb.createTodo({
    title,
    description,
    dueDate,
    priority,
  });
  pubsub.publish("todo/change", result);
}

function saveTodo({ todoId, title, description, dueDate, priority }) {
  const result = todoDb.saveTodo({
    todoId,
    title,
    description,
    dueDate,
    priority,
  });
  pubsub.publish("todo/change", result);
}

function removeTodo(todoId) {
  const result = todoDb.removeTodo(todoId);
  pubsub.publish("todo/change", result);
}

function createTodoList(title) {
  const result = todoDb.createTodoList(title);
  pubsub.publish("todoList/change", result);
}

function saveTodoList({ todoListId, title }) {
  const result = todoDb.saveTodoList({ todoListId, title });
  pubsub.publish("todoList/change", result);
}

function removeTodoList(todoListId) {
  const result = todoDb.removeTodoList(todoListId);
  pubsub.publish("todoList/change", result);
}

pubsub.subscribe("init", initLog);
pubsub.subscribe("todo/change", logTodo);
pubsub.subscribe("todo/create", createTodo);
pubsub.subscribe("todo/save", saveTodo);
pubsub.subscribe("todo/remove", removeTodo);
pubsub.subscribe("todoList/change", logTodoList);
pubsub.subscribe("todoList/create", createTodoList);
pubsub.subscribe("todoList/save", saveTodoList);
pubsub.subscribe("todoList/remove", removeTodoList);

todoDb.init();
pubsub.publish("init", { todoLists: todoDb.getTodoLists() });
