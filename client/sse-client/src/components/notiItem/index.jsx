import './index.css';
import { useState } from 'react';

function NotiItem({ item }) {
  const [isRead, setIsRead] = useState(false);
  const handleRead = () => {
    setIsRead(true);
  };

  return (
    <div
      className={`notiItem__container ${!isRead && "unread"}`}
      onClick={handleRead}
    >
      NotiItem
    </div>
  );
}

export default NotiItem;
