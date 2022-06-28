import { Search, Person, Chat } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import noAvatar from "../../assets/noAvatar.png";

import "./navbar.css";

import React from "react";

function Navbar() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
  };

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className='topbarContainer'>
      <div className='topbarLeft'>
        <Link to='/' style={{ textDecoration: "none" }}>
          <span className='logo'>Social - Food</span>
        </Link>
      </div>
      <div className='topbarCenter'>
        <div className='searchbar'>
          <Search className='searchIcon' />
          <input placeholder='Search Something....' className='searchInput' />
        </div>
      </div>
      <div className='topbarRight'>
        <div className='topbarLinks'>
          <Link to='/' className='linkTimeLine'>
            <span className='topbarLink'>Time-Line</span>
          </Link>

          <span className='topbarLink' onClick={handleLogout}>
            Log-Out
          </span>
        </div>
        <div className='topbarIcons'>
          <Link to={`/profile/${user.username}`}>
            <div className='topbarIconItem'>
              <Person />
            </div>
          </Link>

          <div className='topbarIconItem'>
            <Chat />
          </div>
        </div>
        <div>
          <Link to={`/profile/${user.username}`}>
            <img
              src={user.profilePicture ? PF + user.profilePicture : noAvatar}
              alt=''
              className='topbarImg'
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
