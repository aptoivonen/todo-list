import todoActions from "./todoActions";
import todoListActions from "./todoListActions";

function init() {
  this._todoLists = todoListActions.initTodoLists();
}

const todoDb = { _todoLists: null, init, ...todoListActions, ...todoActions };

export default todoDb;
