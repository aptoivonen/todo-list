class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.onTodoListsChanged(this.model.getTodoLists());
    this.view.todoListView.bindAddTodoListHandler(
      this.handleAddTodoList.bind(this)
    );
    this.view.todoListView.bindDeleteTodoListHandler(
      this.handleDeleteTodoList.bind(this)
    );
    this.model.bindTodoListsChanged(this.onTodoListsChanged.bind(this));
  }

  onTodoListsChanged(todoLists) {
    this.view.todoListView.setTodoLists(todoLists);
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
}

export default Controller;
