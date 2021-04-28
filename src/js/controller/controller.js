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

    this.view.todoView.bindAddTodoHandler(this.handleAddTodo.bind(this));
    this.view.todoView.bindEditTodoHandler(this.handleEditTodo.bind(this));
    this.view.todoView.bindDeleteTodoHandler(this.handleDeleteTodo.bind(this));

    this.model.bindTodoListsChanged(this.onTodoListsChanged.bind(this));
  }

  onTodoListsChanged(todoLists) {
    this.view.todoListView.updateTodoLists(todoLists);
    if (todoLists.length === 0) {
      this.activeTodoListId = undefined;
      this.view.todoView.updateTodoList(null);
      return;
    }
    const foundTodoList = todoLists.find(
      (todoList) => todoList.id === this.activeTodoListId
    );
    if (!this.activeTodoListId || !foundTodoList) {
      const firstTodoList = todoLists[0];
      this.handleActiveTodoList(firstTodoList);
      this.view.todoView.updateTodoList(firstTodoList);
      return;
    }
    this.view.todoView.updateTodoList(foundTodoList);
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

  handleActiveTodoList(todoList) {
    if (this.activeTodoListId === todoList.id) {
      return;
    }
    this.activeTodoListId = todoList.id;
    this.view.todoListView.setActiveTodoList(todoList.id);
    this.view.todoView.updateTodoList(todoList);
  }

  handleAddTodo({ todoListId, title, description, dueDate, priority }) {
    this.model.addTodo({ todoListId, title, description, dueDate, priority });
  }

  handleEditTodo({ id, title, description, dueDate, priority }) {
    this.model.editTodo({ id, title, description, dueDate, priority });
  }

  handleDeleteTodo(id) {
    this.model.deleteTodo(id);
  }
}

export default Controller;
