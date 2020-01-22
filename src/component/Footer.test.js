import React from "react";
import { shallow } from "enzyme";
import Footer from "./Footer.js";

it("this is my first test", () => {
  const wrapper = shallow(<Footer />);
  const span = wrapper.find("p");
  const result = span.text();

  expect(result).toBe("this is the footer");
});
