import { useState, useEffect } from 'react';

export default function useInitPostView() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const init = async () => {
      const headersList = {
        Accept: 'application/json',
        'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
      };

      const response = await fetch('http://localhost:3000/post', {
        method: 'GET',
        headers: headersList,
      });

      const data = await response.json();
      setPosts(data);
    };

    init();
  }, []);

  return { posts };
}
