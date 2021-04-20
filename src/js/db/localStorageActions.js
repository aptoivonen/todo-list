const storageKey = "todoApp";
const hasLocalStorage = "localStorage" in window;

const save = (todoLists) => {
  if (hasLocalStorage) {
    localStorage.setItem(storageKey, JSON.stringify(todoLists));
  }
};

const fetch = () => {
  if (hasLocalStorage) {
    return JSON.parse(localStorage.getItem(storageKey));
  }
  return null;
};

const localStorageActions = {
  save,
  fetch,
};

export default localStorageActions;
