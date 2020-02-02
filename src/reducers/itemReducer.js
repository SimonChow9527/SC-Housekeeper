import { Category } from "../component/Constants.js";
const initState = {
  items: [
    {
      id: 1,
      UserId: "",
      Name: "apple",
      Flavor: "red",
      Brand: "",
      Category: Category.Kitchen,
      Usage: 15,
      DailyUsage: 10,
      StartDate: "2020-01-15",
      ExpireDate: "2020-02-25",
      Note: "this is apple"
    },
    {
      id: 2,
      UserId: "",
      Name: "apple",
      Flavor: "green",
      Brand: "fushi",
      Category: Category.Kitchen,
      Usage: 61,
      DailyUsage: 10,
      StartDate: "2020-01-15",
      ExpireDate: "2020-02-10",
      Note: "this is apple"
    },
    {
      id: 3,
      UserId: "",
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
      id: 4,
      UserId: "",
      Name: "Bleach",
      Flavor: "",
      Brand: "Aldi",
      Category: Category.Bathroom,
      Usage: 80,
      DailyUsage: 10,
      StartDate: "2020-01-15",
      ExpireDate: "",
      Note: "Bathroom"
    },
    {
      id: 5,
      UserId: "",
      Name: "black and white",
      Flavor: "",
      Brand: "",
      Category: Category.Medicine,
      Usage: 10,
      DailyUsage: "",
      StartDate: "2020-01-15",
      ExpireDate: "2022-02-05",
      Note: "try note"
    },
    {
      id: 6,
      UserId: "",
      Name: "black and white",
      Flavor: "",
      Brand: "",
      Category: Category.Medicine,
      Usage: 10,
      DailyUsage: "",
      StartDate: "2020-01-15",
      ExpireDate: "2022-02-05",
      Note: "try note"
    },
    {
      id: 7,
      UserId: "",
      Name: "expired",
      Flavor: "",
      Brand: "",
      Category: Category.Medicine,
      Usage: 10,
      DailyUsage: "",
      StartDate: "2020-01-15",
      ExpireDate: "2020-01-30",
      Note: "try note"
    },
    {
      id: 8,
      UserId: "",
      Name: "black and white",
      Flavor: "",
      Brand: "",
      Category: Category.Medicine,
      Usage: 10,
      DailyUsage: "",
      StartDate: "2020-01-15",
      ExpireDate: "2020-02-05",
      Note: "try note"
    }
  ]
};

function itemReducer(state = initState, action) {
  return state;
}

export default itemReducer;
