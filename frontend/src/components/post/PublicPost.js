import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

import { format } from "timeago.js";

import "./post.css";

import React from "react";

const PublicPost = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [restaurant, setRestaurant] = useState({});

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user: currentUser } = useContext(AuthContext);
  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users/?userId=${post.userId}`);
      setUser(res.data);
    };
    const fetchRestaurant = async () => {
      const res = await axios.get(
        `/restaurants/?restaurantId=${post.restaurantId}`
      );

      setRestaurant(res.data);
    };
    fetchRestaurant();

    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put(`/posts/${post._id}/like`, { userId: currentUser._id });
    } catch (error) {
      console.log(error);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className='post'>
      <div className='postWrapper'>
        <div className='postTop'>
          <div className='postTopLeft'>
            <img
              className='postProfileImg'
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "noAvatar.png"
              }
              alt=''
            />
            <span className='postUsername'>
              <span className='bold'> {user.username} </span>in{" "}
              <span className='bold'>{restaurant.restaurantname}</span>
            </span>{" "}
          </div>

          <h6 className='postDate'>{format(post.createdAt)}</h6>
        </div>
        <div className='postCenter'>
          <img className='postImg' src={PF + post.img} alt='' />
        </div>
        <div className='postBottom'>
          <div className='postBottomLeft'>
            <img
              className='likeIcon'
              src={`${PF}like.png`}
              onClick={likeHandler}
              alt=''
            />
            <img
              className='likeIcon'
              src={`${PF}heart.png`}
              onClick={likeHandler}
              alt=''
            />
            <span className='postLikeCounter'>{like} people like it</span>
          </div>
          <div className='postBottomRight'>
            {" "}
            <h3 className='postText'>{post.desc}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicPost;
