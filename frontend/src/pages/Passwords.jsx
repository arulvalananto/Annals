import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import BackButton from "../components/BackButton";
import Password from "./Password";

const headers = [
  "No",
  "Name",
  "Username",
  "Password",
  "URL",
  "Last modified",
  "Actions",
];

const Passwords = () => {
  const history = useHistory();

  const { passwords } = useSelector((state) => state.personal);

  if (!passwords.length) {
    history.push("/personal");
  }

  return (
    <div className="p-1 sm:p-5">
      <BackButton />
      <h2 className="font-bold text-3xl my-5 capitalize">passwords</h2>
      <div className="bg-mildgray flex items-center justify-between p-3 rounded-sm mb-5">
        {headers.map((header) => (
          <p className="flex-1 text-center">{header}</p>
        ))}
      </div>
      <div>
        {passwords.map((password, index) => (
          <Password password={password} index={index} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Passwords;
