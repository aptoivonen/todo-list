import todoDb from "../db/todoDb";
import pubsub from "../utils/pubsub";

function log(msg, data) {
  console.log(msg, data);
}

function createTodo({ todoListId, title, description, dueDate, priority }) {
  const result = todoDb.createTodo({
    todoListId,
    title,
    description,
    dueDate,
    priority,
  });
  if (result) {
    pubsub.publish("todo/created", result);
  }
}

function saveTodo({ todoId, title, description, dueDate, priority }) {
  const result = todoDb.saveTodo({
    todoId,
    title,
    description,
    dueDate,
    priority,
  });
  if (result) {
    pubsub.publish("todo/saved", result);
  }
}

function removeTodo(todoId) {
  const result = todoDb.removeTodo(todoId);
  if (result) {
    pubsub.publish("todo/removed", { todoId, result });
  }
}

function createTodoList(title) {
  const result = todoDb.createTodoList(title);
  if (result) {
    pubsub.publish("todoList/created", result);
  }
}

function saveTodoList({ todoListId, title }) {
  const result = todoDb.saveTodoList({ todoListId, title });
  if (result) {
    pubsub.publish("todoList/saved", result);
  }
}

function removeTodoList(todoListId) {
  const result = todoDb.removeTodoList(todoListId);
  if (result) {
    pubsub.publish("todoList/removed", { todoListId, result });
  }
}
pubsub
  .subscribe("todo/created", log.bind(null, "todo/created"))
  .subscribe("todo/saved", log.bind(null, "todo/saved"))
  .subscribe("todo/removed", log.bind(null, "todo/removed"))
  .subscribe("todoList/created", log.bind(null, "todoList/created"))
  .subscribe("todoList/saved", log.bind(null, "todoList/saved"))
  .subscribe("todoList/removed", log.bind(null, "todoList/removed"))
  .subscribe("init", log.bind(null, "init"))
  .subscribe("user/todo/create", createTodo)
  .subscribe("user/todo/save", saveTodo)
  .subscribe("user/todo/remove", removeTodo)
  .subscribe("user/todoList/create", createTodoList)
  .subscribe("user/todoList/save", saveTodoList)
  .subscribe("user/todoList/remove", removeTodoList);

function initController() {
  todoDb.init();
  pubsub.publish("init", todoDb.getTodoLists());
}

export { initController };
