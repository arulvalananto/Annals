import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Lock } from "@mui/icons-material";

import logo from "../assets/logo.png";
import Button from "../components/Button";
import CustomForm from "../components/Form";
import Input from "../components/Input";
import { login } from "../store/actions/auth.actions";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email address")
    .required("Email address is required")
    .label("Email Address"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password length should be 8 or above characters")
    .label("Password"),
});

const SignIn = () => {
  const dispatch = useDispatch();
  const { failure } = useSelector((state) => state.notify);

  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleLoading = (val) => setLoading(val);

  const handleSubmit = (values) =>
    dispatch(login(values, handleLoading, history));

  return (
    <div className="grid grid-cols-5 w-screen h-screen font-poppins select-none">
      <div className="hidden xl:block col-span-2 bg-primary bg-signin-cover bg-cover p-5">
        <Link to="/welcome">
          <img
            src={logo}
            alt="Annals Logo"
            className="w-16 h-16 object-contain"
          />
        </Link>
      </div>
      <div className="col-span-5 xl:col-span-3 bg-white p-3 sm:p-10 w-full h-screen overflow-auto">
        <nav className="w-full flex items-center justify-end">
          <span className="mr-5">New User?</span>
          <Link to="/sign-up">
            <Button title="Sign Up" className="bg-secondary text-white" />
          </Link>
        </nav>
        <div className="mt-20">
          <h1 className="text-4xl font-bold text-center mb-2 uppercase">
            Sign In
          </h1>
          <p className="text-center text-xl">Welcome back😍</p>
          <div className="sm:w-3/4 m-auto mt-10">
            <CustomForm
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="border-2 border-darkgray bg-gray mb-2 focus:border-primary w-full"
                />
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="border-2 border-darkgray bg-gray mb-2 focus:border-primary w-full"
                  Icon={Lock}
                />
                <Link
                  to="/forgot-password"
                  className="underline text-primary mb-2 flex justify-end outline-none"
                >
                  Forgot Password ?{" "}
                </Link>
                <Button
                  type="submit"
                  title="Sign In"
                  loading={loading}
                  className="bg-primary text-white w-full p-3 mt-5"
                />
              </Form>
            </CustomForm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
