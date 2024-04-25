import React, { useState, useEffect } from "react";
import Post from "./Post";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // check do we have data in DB

  const limit = 5;
  // do api call for first time
  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    if (!loading && hasMore) {
      const handleScroll = () => {
        if (
          window.innerHeight + document.documentElement.scrollTop ===
          document.documentElement.offsetHeight
        ) {
          loadPosts();
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [loading, hasMore]);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:4000/posts?page=${page}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setPosts((prevPosts) => [...prevPosts, ...data]);
      setPage((prevPage) => prevPage + 1);
      setHasMore(data.length === limit);
    } catch (error) {
      console.error("Error fetching posts: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {posts.map((post) => (
        <Post post={post} />
      ))}
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default Home;
