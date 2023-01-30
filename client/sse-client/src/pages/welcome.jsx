import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';

function Welcome() {
  const [input, setInput] = useState({ username: '', password: '' });
  const { authenticate } = useAuth();

  const handleChange = (e) => {
    setInput((prev) => {
      return {
        ...prev,
        [e.target.id]: e.target.value,
      };
    });
  };

  const handleSubmit = async () => {
    await authenticate(input.username, input.password);
  };

  return (
    <div style={{ width: 'fit-content', margin: 'auto' }}>
      <p>Username</p>
      <input type="text" id="username" onChange={(e) => handleChange(e)} />
      <p>Password</p>
      <input type="password" id="password" onChange={(e) => handleChange(e)} />
      <div style={{ display: 'block', marginTop: '8px' }}>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default Welcome;
