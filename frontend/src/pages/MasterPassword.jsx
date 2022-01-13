import React, { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "formik";
import * as yup from "yup";
import LogoutIcon from "@mui/icons-material/Logout";
import { Tooltip } from "@mui/material";

import logo from "../assets/logo-2.png";
import CustomForm from "../components/Form";
import Input from "../components/Input";
import Button from "../components/Button";
import axios from "../api/axios";
import { logout } from "../store/actions/auth.actions";
import toast from "react-hot-toast";

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .min(10, "Minimum length should be above 10")
    .required("Field is required")
    .label("Master Password"),
});

const createValidationSchema = yup.object().shape({
  password: yup
    .string()
    .min(10, "Minimum length should be above 10")
    .required("Field is required")
    .label("Master password"),
  confirmPassword: yup
    .string()
    .min(10, "Minimum length should be above 10")
    .required("Field is required")
    .label("Confirm master password")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const MasterPassword = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleError = (message) => setError(message);

  const handleCreate = async (values) => {
    try {
      setLoading(true);

      const response = await axios.post("/auth/generate-master-password", {
        masterPassword: values.password,
      });
      if (response.status !== 201 && !response.data)
        return toast.error("something went wrong");

      sessionStorage.setItem("verified", response.data.token);
      history.push("/");
    } catch (err) {
      if (err.response) return toast.error(err.response.data.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      const response = await axios.post("/auth/check-master-password", {
        masterPassword: values.password,
      });
      if (response.status !== 200 && !response.data)
        return toast.error("Something went wrong");

      sessionStorage.setItem("verified", response.data.token);
      history.push("/");
    } catch (err) {
      console.log(err.response);

      if (err.response) return toast.error(err.response.data.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderForm = useCallback(() => {
    if (!user.hasMasterPassword) {
      return (
        <CustomForm
          initialValues={{ password: "", confirmPassword: "" }}
          validationSchema={createValidationSchema}
          onSubmit={handleCreate}
        >
          <Form>
            <Input
              type="password"
              name="password"
              placeholder="master password"
              className="px-4 py-3 text-sm bg-mildgray outline-none transition-all focus:border-tertiary border-2 rounded focus:border-opacity-100 w-96 border-gray-700 text-white"
            />
            <Input
              type="password"
              name="confirmPassword"
              placeholder="confirm master password"
              className="px-4 py-3 text-sm bg-mildgray outline-none transition-all focus:border-tertiary border-2 rounded focus:border-opacity-100 w-96 border-gray-700 text-white"
            />
            <Button
              title="Submit"
              type="submit"
              className="bg-tertiary w-96"
              loading={loading}
            />
          </Form>
        </CustomForm>
      );
    } else {
      return (
        <CustomForm
          initialValues={{ password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <Input
              type="password"
              name="password"
              placeholder="Enter your master password"
              className="px-4 py-3 text-sm bg-mildgray outline-none transition-all focus:border-secondary border-2 rounded focus:border-opacity-100 w-96 border-gray-700 text-white"
            />
            <Button
              title="Submit"
              type="submit"
              className="bg-secondary w-96"
              loading={loading}
            />
          </Form>
        </CustomForm>
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.hasMasterPassword, loading]);

  const handleLogout = () => {
    dispatch(logout());
    history.push("/");
  };

  return (
    <div className="w-screen h-screen bg-mildgray  flex flex-col items-center justify-center relative">
      <img src={logo} alt="Annals logo" className="w-40 h-40 object-cover" />
      {renderForm()}
      <Tooltip title="Logout">
        <button
          type="button"
          onClick={handleLogout}
          className="absolute top-0 right-0 text-white rounded text-lg m-5 px-4 py-2 hover:text-danger"
        >
          <LogoutIcon fontSize="large" />
        </button>
      </Tooltip>
    </div>
  );
};

export default MasterPassword;
