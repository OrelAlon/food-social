import { Link } from "react-router-dom";

// import { useState, useEffect } from "react";
// import axios from "axios";

import "./favorite.css";

function Favorite({ restaurant }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  // const [restaurantsList, setRestaurantsList] = useState([]);
  // useEffect(() => {
  //   const fetchRestaurants = async () => {
  //     const res = await axios.get(`/restaurants/restaurants`);
  //     setRestaurantsList(res.data);
  //   };

  //   fetchRestaurants();
  //   console.log(restaurantsList);
  // }, []);

  return (
    <li className='rightbarRestaurants'>
      <div className='rightbarProfileImgContainer'>
        <Link to={`/restaurant/${restaurant.restaurantname}`}>
          <img
            className='rightbarProfileImg'
            src={
              restaurant.profilePicture.includes("https")
                ? restaurant.profilePicture
                : PF + restaurant.profilePicture
            }
            alt=''
          />
        </Link>
      </div>
      <span className='rightbarRestaurant'> {restaurant.restaurantname}</span>
    </li>
  );
}

export default Favorite;
