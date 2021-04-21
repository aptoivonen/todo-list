import pubsub from "../pubsub/pubsub";
import { empty } from "../domutils/domutils";

const todoListComponent = {
  $container: null,
  $template: null,

  todoLists: [],

  attach($container) {
    this.$container = $container;
    this.$template = document.getElementById("todoListLiTemplate").content;
    pubsub.subscribe("init", (todoLists) => {
      this.getTodoLists(todoLists);
    });
  },

  getTodoLists(todoLists) {
    this.todoLists = todoLists;
    this.render();
  },

  render() {
    empty(this.$container);
    const fragment = document.createDocumentFragment();
    this.todoLists.forEach((todoList) => {
      const li = this.$template.cloneNode(true);
      li.querySelector(".todolist-item-title").textContent = todoList.title;
      li.querySelector(".todolist-item-number-of-todos").textContent =
        todoList.todos.length;
      fragment.appendChild(li);
    });
    this.$container.appendChild(fragment);
  },
};

export { todoListComponent };
