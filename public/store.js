import { applyMiddleware, createStore } from "redux";
import axios from "axios";
import logger from "redux-logger";
import thunk from "redux-thunk";
import LoginApp from "./reducers";

const middleware = applyMiddleware();
const store = createStore(LoginApp);

export default store;