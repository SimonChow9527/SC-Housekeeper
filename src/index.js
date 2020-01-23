import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import SCHousekeeper from "./SCHousekeeper";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<SCHousekeeper />, document.getElementById("root"));
serviceWorker.unregister();
