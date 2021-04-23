import "../scss/main.scss";
import Model from "./models/model";
import View from "./views/view";
import Controller from "./controller/controller";

const model = new Model();
const app = new Controller(model, new View());
window.model = model;
