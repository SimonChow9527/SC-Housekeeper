import actionTypes from "../actions/actionTypes";

const initState = {
  userLoggedIn: false
};

function authReducer(state = initState, action) {
  if (action.type === actionTypes.USER_LOGGED_IN) {
    return {
      ...state,
      userLoggedIn: action.USERLOGGEDIN
    };
  }
  return state;
}

export default authReducer;
