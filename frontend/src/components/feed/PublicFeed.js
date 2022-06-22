import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import axios from "axios";

import Share from "../share/Share";
import PublicPost from "../post/PublicPost";
import "./feed.css";

const PublicFeed = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`/posts/feed`);
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
          <PublicPost key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
};
export default PublicFeed;
