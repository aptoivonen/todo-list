import pubsub from "../pubsub/pubsub";
import { empty } from "../domutils/domutils";
import todoListTemplate from "../../handlebars/todolist-template.handlebars";

const todoListComponent = {
  $container: null,
  template: null,

  todoLists: [],

  attach($container) {
    this.$container = $container;
    this.template = todoListTemplate;
    pubsub.subscribe("init", (todoLists) => {
      this.getTodoLists(todoLists);
    });
  },

  getTodoLists(todoLists) {
    this.todoLists = todoLists;
    console.log(todoLists);
    this.render();
  },

  render() {
    empty(this.$container);
    this.$container.innerHTML = this.template({
      todoLists: this.todoLists,
    });
  },
};

export { todoListComponent };
