import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/authContext';
import useCom from './useCom';

export default function useAuth() {
  const { user, setUser } = useContext(AuthContext);
  const [authorized, setAuthorized] = useState(false);
  const { assign } = useCom();

  const authenticate = async (username, password) => {
    try {
      const headersList = {
        Accept: '*/*',
        'Content-Type': 'application/json',
      };

      const bodyContent = JSON.stringify({
        username: username,
        password: password,
      });

      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        body: bodyContent,
        headers: headersList,
      });

      if (response.ok) {
        let data = await response.json();
        setUser(data);
        console.log(data);
        assign(data.id);
        setAuthorized(true);
      } else {
        setAuthorized(false);
      }

      return response.status;
    } catch (error) {
      console.error(error);
    }
  };

  return { authenticate, user, authorized, setAuthorized };
}
