import React from "react";
import { useSelector } from "react-redux";
import { greet } from "../../utils/helpers";

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <div className="h-40 bg-mildgray w-full px-10 py-8">
        <h1>
          Good {greet()}, {user.fullName}
        </h1>
      </div>
    </div>
  );
};

export default Home;
