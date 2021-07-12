import { shallow } from "enzyme";

import React from "react";
import FormInput from "./FormInput.component";

it("expect render FormInput Component", () => {
  const wrapper = shallow(<FormInput />);
  // expect(wrapper).toMatchSnapshot();
  expect(wrapper.find("input").length).toEqual(1);
  expect(wrapper.find("span").length).toEqual(1);
});
