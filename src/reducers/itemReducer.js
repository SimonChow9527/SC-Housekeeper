import { Category } from "../component/Constants.js";
const initState = {
  items: [
    {
      ID: 1,
      UserID: "",
      Name: "apple",
      Flavor: "red",
      Brand: "",
      Category: Category.Kitchen,
      Usage: 15,
      DailyUsage: 10,
      StartDate: "2020-01-15",
      ExpireDate: "2020-02-25",
      isFinished: false,
      FinishDate: "",
      Note: "this is apple"
    },
    {
      ID: 2,
      UserID: "",
      Name: "apple",
      Flavor: "green",
      Brand: "fushi",
      Category: Category.Kitchen,
      Usage: 61,
      DailyUsage: 10,
      StartDate: "2020-01-15",
      ExpireDate: "2020-02-10",
      isFinished: false,
      FinishDate: "",
      Note: "this is apple"
    },
    {
      ID: 3,
      UserID: "",
      Name: "chip",
      Flavor: "tomatto",
      Brand: "home made",
      Category: Category.Kitchen,
      Usage: 69,
      DailyUsage: 10,
      StartDate: "2020-01-15",
      ExpireDate: "2020-02-05",
      isFinished: false,
      FinishDate: "",
      Note: "try note"
    },
    {
      ID: 4,
      UserID: "",
      Name: "Bleach",
      Flavor: "",
      Brand: "Aldi",
      Category: Category.Bathroom,
      Usage: 80,
      DailyUsage: 10,
      StartDate: "2020-01-15",
      ExpireDate: "",
      isFinished: false,
      FinishDate: "",
      Note: "Bathroom"
    },
    {
      ID: 5,
      UserID: "",
      Name: "black and white",
      Flavor: "",
      Brand: "",
      Category: Category.Medicine,
      Usage: 10,
      DailyUsage: "",
      StartDate: "2020-01-15",
      ExpireDate: "2022-02-05",
      isFinished: false,
      FinishDate: "",
      Note: "try note"
    },
    {
      ID: 6,
      UserID: "",
      Name: "black and white",
      Flavor: "",
      Brand: "",
      Category: Category.Medicine,
      Usage: 8,
      DailyUsage: "",
      StartDate: "2020-01-15",
      ExpireDate: "2022-02-05",
      isFinished: false,
      FinishDate: "",
      Note: "try note"
    },
    {
      ID: 7,
      UserID: "",
      Name: "expired",
      Flavor: "",
      Brand: "",
      Category: Category.Medicine,
      Usage: 1,
      DailyUsage: "",
      StartDate: "2020-01-15",
      ExpireDate: "2020-01-30",
      isFinished: false,
      FinishDate: "",
      Note: "try note"
    },
    {
      ID: 8,
      UserID: "",
      Name: "black and white",
      Flavor: "",
      Brand: "",
      Category: Category.Medicine,
      Usage: 35,
      DailyUsage: "",
      StartDate: "2020-01-15",
      ExpireDate: "2020-02-05",
      isFinished: false,
      FinishDate: "",
      Note: "try note"
    },
    {
      ID: 9,
      UserID: "",
      Name: "dog shit",
      Flavor: "bitter",
      Brand: "self-made",
      Category: Category.Medicine,
      Usage: 60,
      DailyUsage: "10",
      StartDate: "2020-02-01",
      ExpireDate: "2021-02-05",
      isFinished: false,
      FinishDate: "",
      Note: "this is for bochuan zhu"
    }
  ]
};

function itemReducer(state = initState, action) {
  return state;
}

export default itemReducer;
