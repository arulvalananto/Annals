import { shallow } from "enzyme";

import Button from "./Button.component";

it("<Button/> component return length 1", () => {
  const wrapper = shallow(<Button inverted>Hello World</Button>);

  expect(wrapper.exists("button")).toBeTruthy();
  expect(wrapper.length).toEqual(1);
  expect(wrapper.props("inverted")).toBeTruthy();
  console.log(wrapper.props())
  expect(wrapper).toMatchSnapshot();
});
