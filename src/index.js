import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import SCHousekeeper from "./SCHousekeeper";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers/rootReducer";
import thunk from "redux-thunk";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const store = createStore(rootReducer, applyMiddleware(thunk));

Amplify.configure(awsconfig);
toast.configure();

ReactDOM.render(
  <Provider store={store}>
    <SCHousekeeper />
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();
