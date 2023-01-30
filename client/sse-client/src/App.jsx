import { useEffect, useState } from 'react';
import './App.css';
import useAuth from './hooks/useAuth';
import General from './pages/general';
import Welcome from './pages/welcome';

function App() {
  const { user } = useAuth();
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (user) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [user]);

  return (
    <div className="App">
      {isAuth ? <General user={user} /> : <Welcome />}
    </div>
  );
}

export default App;
