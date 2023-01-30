import React, { useEffect } from 'react';
import './index.css';
import NotiItem from '../notiItem';

function Notification({ isOpened, notiItems }) {
  return (
    <div className={`notification__container ${isOpened && 'active'}`}>
      {notiItems.map((item, index) => {
        return <NotiItem key={index} item={item}/>;
      })}
    </div>
  );
}

export default Notification;
