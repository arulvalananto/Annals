import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form } from "formik";
import * as yup from "yup";

import logo from "../assets/logo-2.png";
import CustomForm from "../components/Form";
import Input from "../components/Input";
import Button from "../components/Button";
import Alerter from "../components/Alerter";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email address")
    .required("Email address is required")
    .label("Email Address"),
});

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleError = (message = "") => setError(message);
  const handleLoading = (val) => handleLoading(val);

  const handleForgotPassword = (values) => {};

  return (
    <>
      <div className="bg-forgotPassword-cover bg-opacity-70 fixed top-0 left-0 w-screen h-screen"></div>
      <div className="bg-bgdark bg-opacity-70 fixed top-0 left-0 w-screen h-screen"></div>
      <div className="bg-bgdark bg-opacity-50 fixed top-0 left-0 w-screen h-screen"></div>
      <div className="w-screen lg:w-2/3  h-screen fixed top-0 left-0 lg:bg-bglight clip-path"></div>
      <div className="w-screen lg:w-1/2 bg-opacity-90 shadow backdrop-blur-lg fixed top-0 left-0 h-screen z-50 text-white p-10 flex flex-col">
        <Alerter message={error} visible={error} handleError={handleError} />
        <div>
          <img
            src={logo}
            className="w-24 h-24 mb-10 object-contain"
            alt="annals logo"
          />
        </div>
        <h1 className="text-white text-4xl sm:text-5xl font-bold mb-4">
          Forgot Password
        </h1>
        <p className="text-darkgray text-sm">
          Want to go Back?{" "}
          <Link to="/sign-in" className="text-secondary text-lg ml-1">
            Login
          </Link>
        </p>
        <CustomForm
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={handleForgotPassword}
        >
          <Form className="mt-10">
            <Input
              type="email"
              placeholder="Enter email address"
              name="email"
              className="border-2 border-darkgray text-black w-full focus:border-primary"
            />
            <Button
              type="submit"
              title="Submit"
              loading={loading}
              className="bg-primary text-white w-full p-3 mt-5"
            />
          </Form>
        </CustomForm>
      </div>
    </>
  );
};

export default ForgotPassword;
