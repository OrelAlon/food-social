import { useState, useEffect } from "react";
import { useParams } from "react-router";

import axios from "axios";

import Navbar from "../../components/navbar/Navbar";
import Leftbar from "../../components/leftbar/Leftbar";
import RestaurantFeed from "../../components/feed/RestaurantFeed";
import Rightbar from "../../components/rightbar/Rightbar";

import "./restaurant.css";

import React from "react";

const Restaurant = () => {
  const [restaurant, setRestaurant] = useState({});
  const restaurantname = useParams().restaurantname;

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchRestaurant = async () => {
      const res = await axios.get(
        `/restaurants/?restaurantname=${restaurantname}`
      );
      setRestaurant(res.data);
    };
    fetchRestaurant();
  }, [restaurantname]);

  return (
    <>
      <Navbar />
      <div className='restaurant'>
        <div></div>
        <Leftbar />
        <div className='restaurantRight'>
          <div className='restaurantInfo'>
            <img
              className='restaurantImg'
              src={
                restaurant
                  ? PF + restaurant.profilePicture
                  : PF + "noAvatar.png"
              }
              alt=''
            />

            <h1 className='restaurantInfoName'>{restaurant.restaurantname}</h1>
            <span className='restaurantInfoDesc'>{restaurant.desc}</span>
            <img
              className='restaurantImg'
              src={restaurant.profilePicture}
              alt=''
            />
          </div>

          <div className='restaurantRightBottom'>
            <RestaurantFeed restaurant={restaurant} />
            <Rightbar />
          </div>
        </div>
      </div>
    </>
  );
};

export default Restaurant;
