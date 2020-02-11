import { Category } from "../component/Constants.js";
import actionTypes from "../actions/actionTypes";
const initState = {
  isLoading: false,
  error: null,
  items: []
};

function itemReducer(state = initState, action) {
  if (action.type === actionTypes.ADD_ITEM) {
    return {
      ...state,
      items: [...state.items, action.ITEM]
    };
  }

  if (action.type === actionTypes.EDIT_ITEM) {
    let index = state.items.findIndex(item => item.ID === action.ITEM.ID);

    return {
      ...state,
      items: [
        ...state.items.slice(0, index), // everything before current post
        {
          ...action.ITEM
        },
        ...state.items.slice(index + 1) // everything after current post
      ]
    };
  }

  return state;
}

export default itemReducer;
