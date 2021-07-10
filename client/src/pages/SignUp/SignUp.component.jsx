import React, { useCallback, useState } from "react";
import "./Signup.style.scss";
// React Router
import { Link, useHistory } from "react-router-dom";
// Axios
import axios from "../../axios";
// React Redux
import { useDispatch } from "react-redux";
import { fetchUser } from "../../redux/reducers/auth.reducer";
import { setFailureMessage } from "../../redux/reducers/message.reducer";
// Image
import SignUpCover from "../../assets/signup__cover.png";
import { CircularProgress } from "@material-ui/core";
// Other Components
import FormInput from "../../components/FormInput/FormInput.component";
import Button from "../../components/Button/Button.component";

const SignUp = () => {
  const dispatch = useDispatch();

  const initialState = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [credentials, setCredentials] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const changeHandler = useCallback(
    (data) => {
      const { name, value } = data;
      setCredentials({ ...credentials, [name]: value });
    },
    [credentials]
  );

  const validateForm = () => {
    const { fullName, email, password, confirmPassword } = credentials;
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let fullNameError = "";
    let passwordError = "";
    let emailError = "";
    let confirmPasswordError = "";

    if (fullName.trim().length === 0 || !/[a-zA-Z0-9]/g.test(fullName)) {
      fullNameError =
        "Please enter valid input. it accepts alphabets and numbers only";
    }
    if (!re.test(email)) {
      emailError = "Please enter valid email address";
    }
    if (password.length < 8) {
      passwordError = "Password should be 8 or above character long";
    }
    if (password !== confirmPassword) {
      confirmPasswordError = "Password does not match";
    }

    if (fullNameError || emailError || passwordError || confirmPasswordError) {
      setErrors({
        ...errors,
        email: emailError,
        fullName: fullNameError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
      });
      return false;
    }
    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      setLoading(true);
      try {
        const response = await axios.post("/api/v1/register", credentials);
        dispatch(fetchUser(response.data));
        setLoading(false);
        history.replace("/");
      } catch (err) {
        dispatch(setFailureMessage(err.response.data.message));
        setLoading(false);
      }
    }
  };

  return (
    <div className="signup">
      <div className="signup__left">
        <Link to="/">
          <p className="signup__leftLogo">_Annals</p>
        </Link>
        <h2 className="signup__leftText">Write and Read Privately</h2>
        <img
          src={SignUpCover}
          alt="Annals SignUp Cover"
          className="signup__leftFooterImage"
        />
      </div>
      <div className="signup__right">
        <div className="signup__rightHead">
          <p>Already have an account?</p>
          <Link to="/signin">
            <button className="signup__rightHeadButton">Sign In</button>
          </Link>
        </div>
        <div className="signup__rightTail">
          <h3 className="signup__rightTailTitle">Sign Up Now</h3>
          <form onSubmit={submitHandler} className="signup__rightTailForm">
            <FormInput
              className="signup__rightTailFormInput"
              type="text"
              placeholder="Full Name"
              name="fullName"
              handleChange={changeHandler}
              autoComplete="off"
              value={credentials.fullName}
              error={errors?.fullName}
            />
            <FormInput
              className="signup__rightTailFormInput"
              type="email"
              placeholder="Email Address"
              name="email"
              handleChange={changeHandler}
              autoComplete="off"
              value={credentials.email}
              error={errors?.email}
            />
            <FormInput
              className="signup__rightTailFormInput"
              type="password"
              placeholder="Password"
              name="password"
              handleChange={changeHandler}
              autoComplete="off"
              value={credentials.password}
              error={errors?.password}
            />
            <FormInput
              className="signup__rightTailFormInput"
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              handleChange={changeHandler}
              autoComplete="off"
              value={credentials.confirmPassword}
              error={errors?.confirmPassword}
            />
            <Button className="signup__rightTailFormButton" type="submit">
              {loading ? (
                <CircularProgress size={26} color="inherit" />
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
