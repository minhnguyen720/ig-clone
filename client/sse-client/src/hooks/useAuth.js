import { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';

export default function useAuth() {
  const { user, setUser } = useContext(AuthContext);

  const authenticate = async (username, password) => {
    let headersList = {
      Accept: '*/*',
      'Content-Type': 'application/json',
    };

    let bodyContent = JSON.stringify({
      username: username,
      password: password,
    });

    let response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      body: bodyContent,
      headers: headersList,
    });

    let data = await response.json();
    setUser(data);
  };

  return { authenticate, user };
}
