import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PermMedia } from "@material-ui/icons";
import React from "react";

import "./register.css";

const Register = () => {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordAgainRef = useRef();

  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordAgainRef.current.value) {
      passwordAgainRef.current.setCustomValidity("Password don't match.");
    } else {
      const user = {
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };

      if (file) {
        const data = new FormData();
        const fileName = Date.now() + file.name;
        data.append("name", fileName);
        data.append("file", file);
        user.profilePicture = fileName;
        try {
          await axios.post("/upload", data);
        } catch (error) {
          console.log(error);
        }
      }

      try {
        await axios.post("/auth/register", user);
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };
  const loginBtn = () => {
    navigate("/login");
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
          <form className='loginBox' onSubmit={handleClick}>
            <input
              placeholder='Username'
              required
              ref={usernameRef}
              className='loginInput'
            />
            <input
              placeholder='Email'
              required
              ref={emailRef}
              className='loginInput'
              type='email'
            />
            <input
              placeholder='Password'
              required
              ref={passwordRef}
              className='loginInput'
              type='password'
              minLength='6'
            />
            <input
              placeholder='Password Again'
              required
              ref={passwordAgainRef}
              className='loginInput'
              type='password'
            />
            <div className='imgLog'>
              {/* http://jsfiddle.net/4cwpLvae/ */}
              <label htmlFor='file' className='loginImg'>
                <PermMedia htmlColor='tomato' className='shareIcon' />
                <span className='shareOptionText'>Add Profile Photo</span>
                <input
                  required
                  style={{ display: "none" }}
                  type='file'
                  name='file'
                  id='file'
                  accept='.png,.jpeg,.jpg,.jfif'
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
            </div>
            <button className='loginButton' type='submit'>
              Sign Up
            </button>
            <button className='loginRegisterButton' onClick={loginBtn}>
              Log into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
