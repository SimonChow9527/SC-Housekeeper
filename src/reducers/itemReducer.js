import actionTypes from "../actions/actionTypes";
const initState = {
  isLoading: false,
  error: "",
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
        ...state.items.slice(0, index), // everything before current item
        {
          ...action.ITEM
        },
        ...state.items.slice(index + 1) // everything after current item
      ]
    };
  }
  if (action.type === actionTypes.DELETE_ITEM) {
    let index = state.items.findIndex(item => item.ID === action.ITEM.ID);

    return {
      ...state,
      items: [
        ...state.items.slice(0, index), // everything before current item
        ...state.items.slice(index + 1) // everything after current item
      ]
    };
  }

  if (action.type === actionTypes.FETCH_ITEMS_BEGIN) {
    return {
      ...state,
      isLoading: true
    };
  }
  if (action.type === actionTypes.FETCH_ITEMS_FAILURE) {
    return {
      ...state,
      isLoading: false,
      error: action.error
    };
  }
  if (action.type === actionTypes.FETCH_ITEMS_SUCCESS) {
    let tempArray = [...state.items, ...action.items];
    let tempSet = new Set(tempArray);
    let finalArray = Array.from(tempSet);
    return {
      ...state,
      isLoading: false,
      items: [...finalArray]
    };
  }
  if (action.type === actionTypes.RESET_ITEMS) {
    let tempArray = [...state.items, ...action.items];
    let tempSet = new Set(tempArray);
    let finalArray = Array.from(tempSet);
    return {
      ...state,
      isLoading: false,
      items: [...finalArray]
    };
  }

  return state;
}

export default itemReducer;
