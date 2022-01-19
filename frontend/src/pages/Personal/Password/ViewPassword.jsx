import React, { useState, useEffect } from "react";
import { Form } from "formik";
import { useSelector } from "react-redux";
import { Edit } from "@mui/icons-material";
import { useHistory, useParams } from "react-router-dom";

import BackButton from "../../../components/BackButton";
import CustomForm from "../../../components/Form";
import IconButton from "../../../components/IconButton";
import Label from "../../../components/Label";
import Input from "../../../components/Input";
import Loader from "../../../components/Loader";
import Button from "../../../components/Button";
import {
  passwordInputs,
  passwordValidationSchema,
} from "../../../data/PersonalInputs";

const ViewPassword = () => {
  const { id } = useParams();
  const history = useHistory();

  const {
    docs: { passwords },
  } = useSelector((state) => state.personal);

  const [password, setPassword] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    setPassword(passwords.find((pass) => pass._id === id));
    setInitialLoading(false);
  }, [id, passwords]);

  const handleEditMode = () => setIsEditMode(!isEditMode);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
  };

  if (initialLoading) {
    return <Loader />;
  }

  if (!passwords.length) {
    history.push("/personal");
    return null;
  }

  return (
    <div className="p-2 md:p-5">
      <BackButton />
      <div className="flex items-center gap-5">
        <h2 className="font-bold text-3xl my-5 capitalize ">
          View / Edit Password
        </h2>
        {!isEditMode && (
          <button type="button" className="" onClick={handleEditMode}>
            <IconButton Icon={Edit} fontSize="1rem" />
          </button>
        )}
      </div>
      <CustomForm
        className="flex flex-col gap-3"
        initialValues={{
          name: password?.name,
          username: password?.username,
          password: password?.password,
          url: password?.url,
        }}
        validationSchema={passwordValidationSchema}
      >
        <Form>
          {passwordInputs.map(
            ({ label, required, type, placeholder, name }, index) => (
              <div className="flex flex-col" key={index}>
                <Label>
                  {label}
                  {required && <span className="text-danger ml-1">*</span>}
                </Label>
                <Input
                  type={type}
                  name={name}
                  value={password[name]}
                  placeholder={placeholder}
                  onChange={handleChange}
                  className={`px-4 py-3 text-sm bg-mildgray color-white outline-none transition-all focus:border-2 focus:border-secondary border-opacity-0 rounded focus:border-opacity-100 w-full`}
                  required={required}
                  disabled={!isEditMode}
                />
              </div>
            )
          )}
          {isEditMode && (
            <Button type="submit" title="Update" className="bg-primary" />
          )}
        </Form>
      </CustomForm>
    </div>
  );
};

export default ViewPassword;
