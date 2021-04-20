import todoDb from "../db/todoDb";
import pubsub from "../pubsub/pubsub";

function changedLog(todo) {
  console.log("todo changed:", todo);
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

pubsub.subscribe("init", initLog);
pubsub.subscribe("todo/change", changedLog);
pubsub.subscribe("todo/create", createTodo);
pubsub.subscribe("todo/save", saveTodo);
pubsub.subscribe("todo/remove", removeTodo);

todoDb.init();
pubsub.publish("init", { todoLists: todoDb.getTodoLists() });
