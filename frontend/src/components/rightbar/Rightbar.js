import { useEffect, useState } from "react";
import { PermMedia } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";

import Favorite from "../favorite/Favorite";

import axios from "axios";

import "./rightbar.css";

import React from "react";

const Rightbar = ({ user }) => {
  const [restaurantsList, setRestaurantsList] = useState([]);
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      const res = await axios.get(`/restaurants/restaurants`);
      setRestaurantsList(res.data);
    };

    fetchRestaurants();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    const update = {
      userId: user._id,
    };
    if (file) {
      const data = new FormData();
      const fileName = file.name;
      data.append("name", fileName);
      data.append("file", file);
      update.profilePicture = fileName;

      try {
        await axios.post("/upload", data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      await axios.put("/users/" + user._id, update);
      await localStorage.setItem("user", JSON.stringify(user));

      try {
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className='rightbarFav'></div>
        <h4 className='rightbarTitle'>Favorite Restaurants</h4>
        <ul className='rightbarFriendList'>
          {restaurantsList.map((res) => (
            <Favorite key={res._id} restaurant={res} />
          ))}
        </ul>{" "}
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        <div className='rightbarTitle'>User information</div>
        <div className='rightbarInfo'>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>City:</span>
            <span className='rightbarInfoValue'>{user.city || "Haifa"}</span>
          </div>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>From:</span>
            <span className='rightbarInfoValue'>{user.from}</span>
          </div>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>Relationship:</span>
            <span className='rightbarInfoValue'>
              {user.relationship === 1
                ? "Single"
                : user.relationship === 1
                ? "Married"
                : "Complicated"}
            </span>
          </div>
          <form className='changePicture' onSubmit={submitHandler}>
            {/* <label htmlFor='file' className='shareOption'> */}
            <PermMedia htmlColor='tomato' className='shareIcon' />
            <span className='shareOptionText'>Change Picture</span>
            <input
              // style={{ display: "none" }}
              type='file'
              id='file'
              accept='.png,.jpeg,.jpg,.jfif'
              onChange={(e) => setFile(e.target.files[0])}
            />
            {/* </label>{" "} */}
            <button className='saveButton' type='submit'>
              Save
            </button>
          </form>
        </div>
      </>
    );
  };
  return (
    <div className='rightbar'>
      <div className='rightbarWrapper'>
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
};

export default Rightbar;
