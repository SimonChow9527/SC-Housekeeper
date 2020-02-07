import actionTypes from "../actions/actionTypes";

const initState = {
  userAuthenticated: false,
  cognitoUser: {
    attributes: {
      name: "doe"
    }
  }
};

function authReducer(state = initState, action) {
  if (action.type === actionTypes.USER_AUTHENTICATED) {
    return {
      ...state,
      userAuthenticated: action.USERAUTHENTICATED
    };
  }

  if (action.type === actionTypes.SET_USER) {
    return {
      ...state,
      cognitoUser: action.COGNITO_USER
    };
  }
  return state;
}

export default authReducer;
