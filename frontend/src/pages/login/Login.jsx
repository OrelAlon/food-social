import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";

import "./login.css";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    await loginCall(
      {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      },
      dispatch
    );
    navigate("/");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className='login'>
      <div className='loginWrapper'>
        <div className='loginLeft'>
          <h3 className='loginLogo'>Social - Food</h3>
          <span className='loginDesc'>
            Share and Post photos of food from around the world
          </span>
        </div>
        <div className='loginRight'>
          <form className='loginBox' onSubmit={handleLogin}>
            <input
              placeholder='Email'
              type='email'
              required
              className='loginInput'
              ref={emailRef}
            />
            <input
              placeholder='Password'
              type='password'
              required
              minLength='6'
              className='loginInput'
              ref={passwordRef}
            />
            <button className='loginButton' type='submit' disabled={isFetching}>
              {isFetching ? <CircularProgress size='25px' /> : "Login"}
            </button>
            {/* <span className='loginForgot'>Forgot Password?</span> */}
          </form>
          <button className='loginRegisterButton' onClick={handleRegister}>
            {isFetching ? (
              <CircularProgress color='white' size='20px' />
            ) : (
              "Create a New Account"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
