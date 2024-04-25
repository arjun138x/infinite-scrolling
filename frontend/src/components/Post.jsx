import React from "react";

const Post = ({ post }) => {
  return (
    <div key={post.id} className="mb-3">
      <img src={post.download_url} className="h-80 w-64" alt="img" />
      <h2>{post.author}</h2>
      <p>{post.body}</p>
    </div>
  );
};

export default Post;
