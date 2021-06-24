import React, { useCallback, useEffect, useRef, useState } from "react";
import "./SignIn.scss";
// React Router
import { Link, useHistory } from "react-router-dom";
// React Icons
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
// Axios
import axios from "../../axios";
// React Redux
import { useDispatch } from "react-redux";
import { fetchUser } from "../../redux/reducers/authSlice";
import { CircularProgress } from "@material-ui/core";
import FormInput from "../../components/FormInput/FormInput";

const SignIn = () => {
  const dispatch = useDispatch();

  const initialState = {
    email: "",
    password: "",
  };

  const [credentials, setCredentials] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const emailRef = useRef();

  const changeHandler = useCallback(
    (data) => {
      const { name, value } = data;
      setCredentials({ ...credentials, [name]: value });
    },
    [credentials]
  );

  const validateForm = () => {
    const { email, password } = credentials;
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let emailError = "";
    let passwordError = "";

    if (!re.test(email)) {
      emailError = "Please enter valid email address";
    }
    if (password.length < 8) {
      passwordError = "Password should be 8 or above character long";
    }

    if (emailError || passwordError) {
      setErrors({
        ...errors,
        email: emailError,
        password: passwordError,
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      setLoading(true);
      try {
        const response = await axios.post("/api/v1/login", credentials);
        if (response.data) {
          dispatch(fetchUser(response.data));
        }
        setLoading(false);
        history.replace("/");
      } catch (err) {
        if (err.response) {
          alert(err.response?.data.message);
        }
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  return (
    <div className="signIn">
      <div className="signIn__left">
        <Link to="/">
          <p className="signIn__leftLogo">_Annals</p>
        </Link>
      </div>
      <div className="signIn__right">
        <div className="signIn__rightHeader">
          <p>New User?</p>
          <Link to="/signup">
            <button className="signIn__rightHeaderButton">Sign Up</button>
          </Link>
        </div>
        <div className="signin__rightFooter">
          <h3 className="signin__rightFooterTitle">Sign In</h3>
          <form className="signin__rightFooterForm" onSubmit={handleSubmit}>
            <FormInput
              ref={emailRef}
              className="signup__rightFooterInput"
              type="email"
              placeholder="Email Address"
              name="email"
              handleChange={changeHandler}
              autoComplete="off"
              value={credentials.email}
              error={errors?.email}
            />
            <FormInput
              className="signup__rightFooterInput"
              type="password"
              placeholder="Password"
              name="password"
              handleChange={changeHandler}
              autoComplete="off"
              value={credentials.password}
              error={errors?.password}
            />
            <Link to="/forgotPassword">
              <p className="signin__rightFooterForgotPassword">
                Forgot Password?
              </p>
            </Link>
            {loading ? (
              <div className="spinner">
                <CircularProgress size={26} color="inherit" />
              </div>
            ) : (
              <button className="signup__rightFooterButton" type="submit">
                Sign In
              </button>
            )}
          </form>
          <p className="signin__splitter">or signin with</p>
          <div className="signin__rightFooterButtonContainer">
            <a href="http://localhost:5000/auth/google">
              <button type="button" className="signin__googleButton">
                <FcGoogle />
              </button>
            </a>
            <a href="http://localhost:5000/auth/facebook">
              <button type="button" className="signin__facebookButton">
                <FaFacebookF />
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
