import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

import axios from "axios";

import Navbar from "../../components/navbar/Navbar";

import { PermMedia } from "@material-ui/icons";

import "./addRestaurant.css";

const AddRestaurant = () => {
  const [file, setFile] = useState(null);

  const restaurantnameRef = useRef();
  const descRef = useRef();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const restaurant = {
      restaurantname: restaurantnameRef.current.value,
      desc: descRef.current.value,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      restaurant.profilePicture = fileName;
      try {
        await axios.post("/upload", data);
      } catch (error) {
        console.log(error);
      }
    }

    try {
      await axios.post("/restaurants/", restaurant);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  // const submitBtn = () => {
  //   navigate("/login");
  // };

  return (
    <>
      <Navbar />
      <div className='addRestaurant'>
        <form action='submit' className='formBox' onSubmit={handleSubmit}>
          <label htmlFor='file' className='loginImg'>
            Add Restaurant Name
          </label>
          <input
            placeholder='Restaurant Name'
            type='string'
            required
            className='restaurantInput'
            ref={restaurantnameRef}
          />
          <label htmlFor='file' className='loginImg'>
            Add Restaurant Description
          </label>
          <input
            placeholder='Restaurant Description'
            type='string'
            className='restaurantInput'
            ref={descRef}
          />

          <div className='imgLog'>
            <label htmlFor='file' className='loginImg'>
              <PermMedia htmlColor='tomato' className='shareIcon' />
              <span className='shareOptionText'>Add Restaurant Logo</span>
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
            Add
          </button>
        </form>
      </div>
    </>
  );
};

export default AddRestaurant;
