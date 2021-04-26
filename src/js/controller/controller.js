class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.activeTodoListId;

    this.onTodoListsChanged(this.model.getTodoLists());

    this._bind();
  }

  _bind() {
    this.view.todoListView.bindAddTodoListHandler(
      this.handleAddTodoList.bind(this)
    );
    this.view.todoListView.bindEditTodoListHandler(
      this.handleEditTodoList.bind(this)
    );
    this.view.todoListView.bindDeleteTodoListHandler(
      this.handleDeleteTodoList.bind(this)
    );
    this.view.todoListView.bindActivateTodoListHandler(
      this.handleActiveTodoList.bind(this)
    );
    this.model.bindTodoListsChanged(this.onTodoListsChanged.bind(this));
  }

  onTodoListsChanged(todoLists) {
    this.view.todoListView.updateTodoLists(todoLists);
    if (todoLists.length === 0) {
      this.activeTodoListId = undefined;
      this.view.todoView.updateTodos([]);
      return;
    }
    const foundTodoList = todoLists.find(
      (todoList) => todoList.id === this.activeTodoListId
    );
    if (!this.activeTodoListId || !foundTodoList) {
      this.handleActiveTodoList(todoLists[0].id);
      this.view.todoView.updateTodos(todoLists[0].todos);
      return;
    }
    this.view.todoView.updateTodos(foundTodoList.todos);
  }

  handleAddTodoList(title) {
    this.model.addTodoList(title);
  }

  handleEditTodoList(id, title) {
    this.model.editTodoList(id, title);
  }

  handleDeleteTodoList(id) {
    this.model.deleteTodoList(id);
  }

  handleActiveTodoList(id) {
    this.activeTodoListId = id;
    this.view.todoListView.setActiveTodoList(id);
  }
}

export default Controller;
