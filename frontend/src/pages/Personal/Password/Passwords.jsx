import React from "react";
import { useSelector } from "react-redux";

import Password from "./Password";

const headers = [
  "No",
  "Name",
  "Username",
  "Password",
  "Last modified",
  "Actions",
];

const Passwords = ({ handleDeleteMode }) => {
  const {
    docs: { passwords },
  } = useSelector((state) => state.personal);

  return (
    <>
      <div className="bg-mildgray flex items-center justify-between p-3 rounded-sm mb-5">
        {headers.map((header) => (
          <p className="flex-1 text-center">{header}</p>
        ))}
      </div>
      {passwords.map((password, index) => (
        <Password
          password={password}
          index={index}
          key={index}
          handleDeleteMode={handleDeleteMode}
        />
      ))}
    </>
  );
};

export default Passwords;
