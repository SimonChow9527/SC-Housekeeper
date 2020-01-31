import { Category } from "../component/Constants.js";
const initState = {
  items: [
    {
      id: 1,
      Name: "apple",
      Flavor: "red",
      Brand: "",
      Category: Category.Kitchen,
      Usage: 15,
      DailyUsage: 10,
      ExpireDate: "",
      Note: ""
    },
    {
      id: 2,
      Name: "chip",
      Flavor: "tomatto",
      Brand: "home made",
      Category: Category.Kitchen,
      Usage: 69,
      DailyUsage: 10,
      StartDate: "2020-01-15",
      ExpireDate: "2020-02-05",
      Note: "try note"
    },
    {
      id: 3,
      Name: "toliet paper",
      Flavor: "",
      Brand: "",
      Category: Category.Bathroom,
      Usage: 15,
      DailyUsage: 10,
      ExpireDate: "",
      Note: ""
    }
  ]
};

function itemReducer(state = initState, action) {
  return state;
}

export default itemReducer;
