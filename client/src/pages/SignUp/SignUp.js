import React, { useCallback, useState } from "react";
import "./Signup.scss";
// React Router
import { Link, useHistory } from "react-router-dom";
// Axios
import axios from "../../axios";
// React Redux
import { useDispatch } from "react-redux";
import { fetchUser } from "../../redux/reducers/authSlice";
// Image
import SignUpCover from "../../assets/signup__cover.png";
import { CircularProgress } from "@material-ui/core";
// Other Components
import FormInput from "../../components/FormInput/FormInput";
import Button from "../../components/Button/Button";

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
        if (err.response) {
          alert(err.response.data.message);
        }
        setLoading(false);
      }
    }
  };

  return (
    <div className="signup">
      <div className="signup__left">
        <Link to="/">
          <p className="signup__leftHeader">_Annals</p>
        </Link>
        <h2 className="signup__leftBody">Write and Read Privately</h2>
        <img
          src={SignUpCover}
          alt="Annals SignUp Cover"
          className="signup__leftFooter"
        />
      </div>
      <div className="signup__right">
        <div className="signup__rightHeader">
          <p>Already have an account?</p>
          <Link to="/signin">
            <button className="signup__rightHeaderButton">Sign In</button>
          </Link>
        </div>
        <div className="signup__rightFooter">
          <h3 className="signup__rightFooterTitle">Sign Up Now</h3>
          <form onSubmit={submitHandler} className="signup__rightFooterForm">
            <FormInput
              className="signup__rightFooterInput"
              type="text"
              placeholder="Full Name"
              name="fullName"
              handleChange={changeHandler}
              autoComplete="off"
              value={credentials.fullName}
              error={errors?.fullName}
            />
            <FormInput
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
            <FormInput
              className="signup__rightFooterInput"
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              handleChange={changeHandler}
              autoComplete="off"
              value={credentials.confirmPassword}
              error={errors?.confirmPassword}
            />
            {loading ? (
              <div className="button-spinner">
                <CircularProgress size={26} color="inherit" />
              </div>
            ) : (
              <Button className="signup__rightFooterButton" type="submit">
                Sign In
              </Button>
            )}
          </form>
          {/* <p className="signup__rightSplitter">or signup with</p>
                    <div className="signup__rightFooterButtonContainer">
                        <a href="http://localhost:5000/auth/google">
                            <button className="signup__googleButton">
                                <FcGoogle />
                            </button>
                        </a>
                        <a href="http://localhost:5000/auth/facebook">
                            <button className="signup__facebookButton">
                                <FaFacebookF />
                            </button>
                        </a>
                    </div> */}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
