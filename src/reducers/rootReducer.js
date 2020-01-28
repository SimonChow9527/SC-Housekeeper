import { combineReducers } from "redux";
import authReducer from "./authReducer.js";
import itemReducer from "./itemReducer.js";

const rootReducer = combineReducers({
  authReducer,
  itemReducer
});
export default rootReducer;
