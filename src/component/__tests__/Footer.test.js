import React from "react";
import { shallow } from "enzyme";
import Footer from "../Footer.js";

describe("test footer", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Footer />);
  });

  it("should have a copyright text", () => {
    const copyright = wrapper.find("div.footer-copyright");
    expect(copyright.length).toBe(1);
  });

  it("should have a contact link", () => {
    const contact = wrapper.find("div.footer-contact");
    expect(contact.length).toBe(1);
  });
});
