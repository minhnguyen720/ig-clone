import './App.css';
import useAuth from './hooks/useAuth';
import General from './pages/general';
import Welcome from './pages/welcome';

function App() {
  const { user, authorized, setAuthorized, authenticate } = useAuth();

  return (
    <div className="App">
      {authorized ? (
        <General user={user} />
      ) : (
        <Welcome authenticate={authenticate} setAuthorized={setAuthorized} />
      )}
    </div>
  );
}

export default App;
