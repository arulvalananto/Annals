import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import cover from "../assets/signup_cover.gif";
import Button from "../components/Button";
import CustomForm from "../components/Form";
import Input from "../components/Input";
import { register } from "../store/actions/auth.actions";

const validationSchema = yup.object().shape({
  fullName: yup
    .string()
    .max(30, "Existing name length")
    .required("Full name is required")
    .label("Full Name"),
  email: yup
    .string()
    .email("Please enter valid email address")
    .required("Email Address is required")
    .label("Email Address"),
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

const SignUp = () => {
  const dispatch = useDispatch();
  const { failure, success } = useSelector((state) => state.notify);

  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleLoading = (val) => setLoading(val);

  const handleSubmit = (values) =>
    dispatch(register(values, handleLoading, history));

  return (
    <div className="grid grid-cols-6 w-screen h-screen font-poppins select-none">
      <div className="hidden w-full h-full xl:block col-span-2 bg-primary p-5 items-center justify-center flex-col">
        <div className="flex items-center justify-center mt-20">
          <img
            src={cover}
            alt="Annals Logo"
            className="w-72 h-72 object-contain"
          />
        </div>
        <h3 className="text-3xl mt-10 text-white font-bold font-rampart w-5/6 m-auto">
          Write and store your data in a secure way
        </h3>
      </div>
      <div className="col-span-6 xl:col-span-4 bg-white p-3 sm:p-10 w-full h-screen overflow-auto">
        <nav className="w-full flex items-center justify-end">
          <span className="mr-5">Have an account?</span>
          <Link to="/sign-in">
            <Button title="Sign In" className="bg-secondary text-white" />
          </Link>
        </nav>
        <div className="mt-10 sm:mt-20">
          <h1 className="text-4xl font-bold text-center mb-2 uppercase">
            Sign Up
          </h1>
          <p className="text-center text-xl">Let's start a journey with us</p>
          <div className="sm:w-3/4 m-auto mt-10">
            <CustomForm
              initialValues={{
                fullName: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <Input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  className="border-2 border-darkgray bg-gray focus:border-primary w-full"
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="border-2 border-darkgray bg-gray focus:border-primary w-full"
                />
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="border-2 border-darkgray bg-gray focus:border-primary w-full"
                />
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="border-2 border-darkgray bg-gray focus:border-primary w-full"
                />
                <Button
                  type="submit"
                  title="Let's Create"
                  loading={loading}
                  className="bg-primary text-white w-full p-3"
                />
              </Form>
            </CustomForm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
