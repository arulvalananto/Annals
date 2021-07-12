import { shallow } from "enzyme";

import App from "./App";

describe("<App/> Component", () => {
  it("should render App component with children component", () => {
    const wrapper = shallow(<App />);

    expect(wrapper).toMatchSnapshot();
  });
});
