import actionTypes from "./actionTypes";

export function userAuthenticator(userAuthenticated) {
  return {
    type: actionTypes.USER_AUTHENTICATED,
    USERAUTHENTICATED: userAuthenticated
  };
}
export function setUser(user) {
  return {
    type: actionTypes.SET_USER,
    COGNITO_USER: user
  };
}
export function loadItems() {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.LOAD_ITEM
    });
  };
}
