function empty(element) {
  while (element.firstChild !== null) {
    element.removeChild(element.firstChild);
  }
}

export { empty };
