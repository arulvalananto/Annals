import { shallow } from "enzyme";

import Header from "./Header.component";

it("expects to render Header Component", () => {
  const wrapper = shallow(<Header />);

  expect(wrapper.find("Link").length).toEqual(3);
});
