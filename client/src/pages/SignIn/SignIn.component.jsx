import React, { useCallback, useState } from "react";
import "./SignIn.style.scss";
// React Router
import { Link, useHistory } from "react-router-dom";
// React Icons
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
// Material-UI
import { CircularProgress } from "@material-ui/core";
// React Redux
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/auth.actions";
// Other Components
import FormInput from "../../components/FormInput/FormInput.component";
import logo from "../../assets/logo.png";

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

  const toggleLoading = (val) => {
    setLoading(val);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      setLoading(true);
      dispatch(login(credentials, toggleLoading, history));
    }
  };

  return (
    <div className='signIn'>
      <div className='signIn__left'>
        <Link to='/'>
          <img src={logo} alt='logo' className='signIn__leftLogo' />
        </Link>
      </div>
      <div className='signIn__right'>
        <div className='signIn__rightHeader'>
          <p>New User?</p>
          <Link to='/signup'>
            <button className='signIn__rightHeaderButton'>Sign Up</button>
          </Link>
        </div>
        <div className='signIn__rightFooter'>
          <h3 className='signIn__rightFooterTitle'>Sign In</h3>
          <p className='signIn__rightFooterSubtitle'>Welcome back ????</p>
          <form className='signIn__rightFooterForm' onSubmit={handleSubmit}>
            <FormInput
              className='signIn__rightFooterFormInput'
              type='email'
              placeholder='Email Address'
              name='email'
              handleChange={changeHandler}
              autoComplete='off'
              value={credentials.email}
              error={errors?.email}
            />
            <FormInput
              className='signIn__rightFooterFormInput'
              type='password'
              placeholder='Password'
              name='password'
              handleChange={changeHandler}
              autoComplete='off'
              value={credentials.password}
              error={errors?.password}
            />
            <Link to='/forgotPassword'>
              <p className='signIn__rightFooterForgot'>Forgot Password?</p>
            </Link>
            <button className='signIn__rightFooterFormButton' type='submit'>
              {!loading ? (
                "Sign up"
              ) : (
                <CircularProgress size={18} color='inherit' />
              )}
            </button>
          </form>
          <p className='signIn__splitter'>OR</p>
          <div className='signIn__rightFooterButtonContainer'>
            <a href='http://localhost:5000/auth/google' aria-label='Google'>
              <p className='signIn__googleButton'>
                <FcGoogle />
              </p>
            </a>
            <a href='http://localhost:5000/auth/facebook' aria-label='Facebook'>
              <p className='signIn__facebookButton'>
                <FaFacebookF />
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
