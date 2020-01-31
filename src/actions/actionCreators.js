import actionTypes from "./actionTypes";

export function userLoggedIn(userLoggedIn) {
  return {
    type: actionTypes.USER_LOGGED_IN,
    USERLOGGEDIN: userLoggedIn
  };
}

export function loadItems() {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.LOAD_ITEM
    });
  };
}
