import actionTypes from "./actionTypes";
import { API } from "aws-amplify";

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
export function loadItems(cognitoUser) {
  return dispatch => {
    dispatch(loadItemsBegin());
    return API.get("itemapi", "/items/" + cognitoUser.attributes.email, {})
      .catch(err => {
        dispatch(loadItemsFailure(err));
        return null;
      })
      .then(res => {
        if (res !== null) {
          dispatch(loadItemsSuccess(res));
        }
      });
  };
}

export function loadItemsBegin() {
  return {
    type: actionTypes.FETCH_ITEMS_BEGIN
  };
}
export function loadItemsSuccess(items) {
  return {
    type: actionTypes.FETCH_ITEMS_SUCCESS,
    items: items
  };
}
export function loadItemsFailure(err) {
  return {
    type: actionTypes.FETCH_ITEMS_FAILURE,
    error: err
  };
}
export function resetItems(items) {
  return {
    type: actionTypes.RESET_ITEMS,
    items: items
  };
}
export function addItem(item) {
  return {
    type: actionTypes.ADD_ITEM,
    ITEM: item
  };
}

export function editItem(item) {
  return {
    type: actionTypes.EDIT_ITEM,
    ITEM: item
  };
}

export function deleteItem(item) {
  return {
    type: actionTypes.DELETE_ITEM,
    ITEM: item
  };
}
