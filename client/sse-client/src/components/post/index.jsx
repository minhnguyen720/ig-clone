import React from 'react';
import './index.css';
import ActionBar from '../actionBar/index';

function Post({ username, imgUrl, like, postId, likedBy }) {
  return (
    <div className="post__container">
      <p className="author">{username}</p>
      <div className="post_img-container">
        <img className="post__img" src={imgUrl} alt="post photo" />
        <ActionBar like={like} postId={postId} likedBy={likedBy} />
      </div>
    </div>
  );
}

export default Post;
