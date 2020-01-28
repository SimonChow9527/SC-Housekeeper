import actionTypes from "./actionTypes";

export function userLoggedIn(userLoggedIn) {
  return {
    type: actionTypes.USER_LOGGED_IN,
    USERLOGGEDIN: userLoggedIn
  };
}
