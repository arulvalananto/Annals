import React from "react";

import PersonalTemplate from "../Template";
import Passwords from "./Passwords";

const PasswordTemplate = () => {
  return (
    <PersonalTemplate
      value="passwords"
      title="Passwords"
      name="password"
      Component={Passwords}
    />
  );
};

export default PasswordTemplate;
