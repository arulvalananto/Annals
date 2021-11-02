import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import logo from "../assets/logo-2.png";
import CustomForm from "../components/Form";
import Input from "../components/Input";
import Button from "../components/Button";
import Alerter from "../components/Alerter";
import { forgotPassword, resetPassword } from "../store/actions/user.actions";

const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email address")
    .required("Email address is required")
    .label("Email Address"),
});
const resetSchema = yup.object().shape({
  code: yup.string().required("Please enter validation code"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password length should be 8 or above characters")
    .label("Password"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .min(8, "Password length should be 8 or above characters")
    .label("Password")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { failure, success } = useSelector((state) => state.notify);

  const [loading, setLoading] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  const handleLoading = (val) => setLoading(val);
  const handleIsCodeSent = () => setIsCodeSent(!isCodeSent);
  const handleIsPasswordChanged = () =>
    setIsPasswordChanged(!isPasswordChanged);

  const handleForgotPassword = (values, { resetForm }) => {
    dispatch(forgotPassword(values, handleLoading, handleIsCodeSent));
    resetForm();
  };
  const handelResetPassword = (values, { resetForm }) => {
    dispatch(
      resetPassword(
        { code: values.code, password: values.password },
        handleLoading,
        handleIsPasswordChanged
      )
    );
    resetForm();
  };

  return (
    <>
      <div className="bg-forgotPassword-cover bg-opacity-70 fixed top-0 left-0 w-screen h-screen"></div>
      <div className="bg-bgdark bg-opacity-70 fixed top-0 left-0 w-screen h-screen"></div>
      <div className="bg-bgdark bg-opacity-50 fixed top-0 left-0 w-screen h-screen"></div>
      <div className="w-screen lg:w-2/3  h-screen fixed top-0 left-0 lg:bg-bglight clip-path"></div>
      <div className="w-screen lg:w-1/2 bg-opacity-90 shadow backdrop-blur-lg fixed top-0 left-0 h-screen z-50 text-white p-10 flex flex-col">
        <Alerter type="error" message={failure} visible={failure} />
        <Alerter type="success" message={success} visible={success} />
        <div>
          <img
            src={logo}
            className="w-24 h-24 mb-10 object-contain"
            alt="annals logo"
          />
        </div>
        {isPasswordChanged ? (
          <div>
            <h2 className="text-4xl">Password Changed Successfully</h2>
            <p className="text-darkgray text-sm mt-4">
              Redirect to
              <Link to="/sign-in" className="text-secondary mx-1">
                Login
              </Link>
              ?
            </p>
          </div>
        ) : (
          <>
            <h1 className="text-white text-4xl sm:text-5xl font-bold mb-4">
              {isCodeSent ? "Verification Code Please" : "Forgot Password"}
            </h1>
            <p className="text-darkgray text-sm">
              {isCodeSent ? (
                "Your token only valid for 10 minutes"
              ) : (
                <>
                  <span>Want to go Back?</span>
                  <Link to="/sign-in" className="text-secondary text-lg ml-1">
                    Login
                  </Link>{" "}
                </>
              )}
            </p>
            {!isCodeSent ? (
              <CustomForm
                initialValues={{ email: "" }}
                validationSchema={forgotPasswordSchema}
                onSubmit={handleForgotPassword}
              >
                <Form className="mt-10">
                  <Input
                    type="text"
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
            ) : (
              <CustomForm
                initialValues={{ code: "", password: "", confirmPassword: "" }}
                validationSchema={resetSchema}
                onSubmit={handelResetPassword}
              >
                <Form className="mt-10">
                  <Input
                    type="text"
                    placeholder="Enter Verification Code"
                    name="code"
                    className="border-2 border-darkgray text-black w-full focus:border-primary"
                  />
                  <Input
                    type="password"
                    placeholder="Enter New Password"
                    name="password"
                    className="border-2 border-darkgray text-black w-full focus:border-primary"
                  />
                  <Input
                    type="password"
                    placeholder="Re-type New Password"
                    name="confirmPassword"
                    className="border-2 border-darkgray text-black w-full focus:border-primary"
                  />
                  <Button
                    type="submit"
                    title="Reset"
                    loading={loading}
                    className="bg-secondary text-white w-full p-3 mt-5"
                  />
                </Form>
              </CustomForm>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ForgotPassword;
