const initState = {
  items: [
    { id: 1, title: "title1" },
    { id: 2, title: "title2" },
    { id: 3, title: "title3" }
  ]
};

function itemReducer(state = initState, action) {
  return state;
}

export default itemReducer;
