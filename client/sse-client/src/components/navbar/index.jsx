import { FaBell, FaDotCircle } from 'react-icons/fa';
import './index.css';
import { useState, useEffect } from 'react';
import Notification from '../notification';

function Navbar({ user }) {
  const [isOpened, setIsOpened] = useState(false);
  const [notiItems, setNotiItems] = useState([]);
  const handleNotification = () => {
    setIsOpened(!isOpened);
  };

  return (
    <div className="navbar__container">
      <div className="navbar__items">
        <div className="navbar__notification">
          <FaBell onClick={handleNotification} id="bell" />
          <div className="navbar__notification-dot">
            <FaDotCircle />
          </div>
          <Notification isOpened={isOpened} notiItems={notiItems} />
        </div>
        <div>
          <p className="navbar__items-user">{user.name}</p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
