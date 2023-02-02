import React, { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import './index.css';
import useAuth from '../../hooks/useAuth';
import useCom from '../../hooks/useCom';

function ActionBar({ postId, like, likedBy }) {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [likeAmt, setLikeAmt] = useState(like);
  const { clientToServer, sendNotification } = useCom();

  useEffect(() => {
    const isLike = likedBy.filter((i) => {
      return i.postId === postId && i.userId === user.id;
    });
    if (isLike.length > 0) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [likedBy, postId]);

  const handleLike = async () => {
    let headersList = {
      Accept: '*/*',
      'Content-Type': 'application/json',
    };

    if (liked) {
      setLikeAmt((prev) => {
        return prev - 1;
      });
    } else {
      setLikeAmt((prev) => {
        return prev + 1;
      });
    }

    let bodyContent = JSON.stringify({
      action: 'like',
      postId: postId,
      sender: user.id,
      likeAmt: like,
    });

    await fetch('http://localhost:3000/post/like', {
      method: 'PUT',
      body: bodyContent,
      headers: headersList,
    });
    setLiked(!liked);
    // sendNotification();
    clientToServer({
      sender: user.id,
      receiver: postId,
      message: 'like',
    });
  };

  return (
    <div
      className={`actionbar__container ${liked && 'liked'}`}
      onClick={handleLike}
    >
      <p>{likeAmt}</p>
      <FaHeart />
    </div>
  );
}

export default ActionBar;
