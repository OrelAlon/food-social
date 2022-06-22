import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import axios from "axios";

import Share from "../share/Share";
import UserPost from "../post/UserPost";
import "./feed.css";

const UserFeed = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get(`/posts/profile/${username}`)
        : await axios.get(`posts/timeline/${user._id}`);
      setPosts(
        res.data.sort(
          (p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt)
        )
      );
    };
    fetchPosts();
  }, [username, user._id]);

  return (
    <div className='feed'>
      <div className='feedWrapper'>
        {(!username || username === user.username) && <Share />}
        {posts.map((p) => (
          <UserPost key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
};
export default UserFeed;
