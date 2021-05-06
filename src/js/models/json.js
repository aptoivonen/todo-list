function replacer(key, value) {
  if (this[key] instanceof Date) {
    return this[key].getTime();
  } else {
    return value;
  }
}

function reviver(key, value) {
  if (typeof value === "number" && value.toString().match(/[\d]{13}/)) {
    return new Date(value);
  } else {
    return value;
  }
}

export { replacer, reviver };
