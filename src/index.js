import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import SCHousekeeper from "./SCHousekeeper";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers/rootReducer";
import thunk from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <SCHousekeeper />
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();
