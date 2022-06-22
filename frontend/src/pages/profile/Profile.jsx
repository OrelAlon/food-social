import { useState, useEffect } from "react";
import { useParams } from "react-router";

import axios from "axios";

import Navbar from "../../components/navbar/Navbar";
import Leftbar from "../../components/leftbar/Leftbar";
import UserFeed from "../../components/feed/UserFeed";
import Rightbar from "../../components/rightbar/Rightbar";

import "./profile.css";

const Profile = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users/?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <Navbar />
      <div className='profile'>
        <Leftbar />
        <div className='profileRight'>
          <div className='profileRightTop'>
            <div className='profileCover'>
              <img
                className='profileCoverImg'
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "noCover.png"
                }
                alt=''
              />
              <img
                className='profileUserImg'
                src={user ? PF + user.profilePicture : PF + "noAvatar.png"}
                alt=''
              />
            </div>
            <div className='profileInfo'>
              <h1 className='profileInfoName'>{user.username}</h1>
              <span className='profileInfoDesc'>{user.desc}</span>
            </div>
          </div>
          <div className='profileRightBottom'>
            <UserFeed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
