import "../scss/main.scss";
import { todoListComponent } from "./ui/ui";
import { init } from "./controller/controller";

const $todoListsRoot = document.getElementById("todoLists");
todoListComponent.attach($todoListsRoot);
init();
