import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/reducers/auth.reducer";

const Home = () => {
  const user = useSelector(selectUser);

  return (
    <div>
      <h3>Welcome back! {user.fullName}</h3>
      <p>For testing purpose: {user.email}</p>
    </div>
  );
};

export default Home;
