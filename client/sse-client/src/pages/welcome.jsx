import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import './welcome.style.css';

function Welcome({ authenticate, setAuthorized }) {
  const [input, setInput] = useState({ username: '', password: '' });
  const [showMessage, setShowMessage] = useState(false);

  const handleChange = (e) => {
    setInput((prev) => {
      return {
        ...prev,
        [e.target.id]: e.target.value,
      };
    });
  };

  const handleSubmit = async () => {
    try {
      const status = await authenticate(input.username, input.password);
      if (status === 401) {
        setAuthorized(false);
        setShowMessage(true);
      } else if (status === 200 || status === 201) {
        setAuthorized(true);
        setShowMessage(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="welcome__container">
      <div className="welcome__form">
        {showMessage && (
          <div className="alert__container">
            <p className="alert">Wrong username or password</p>
          </div>
        )}
        <div>
          <p>Username</p>
          <input type="text" id="username" onChange={(e) => handleChange(e)} />
        </div>
        <div>
          <p>Password</p>
          <input
            type="password"
            id="password"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button className="welcome__submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default Welcome;
