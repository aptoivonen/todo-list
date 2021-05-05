import "../scss/main.scss";
import Model from "./models/model";
import View from "./views/view";
import Controller from "./controller/controller";

const app = new Controller(new Model(), new View());
