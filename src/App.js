import { useEffect, useState } from 'react';
import './App.css';
import Login from './Login';
import Main from './Main';
import Profile from './Profile';

function App() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const res = localStorage.getItem('firstLogin');
    if (res) {
      setIsLogged(true);
    }
  }, [setIsLogged]);
  return (
    <div className='App'>
      <Main />
      <Login />
      {isLogged && <Profile />}
    </div>
  );
}

export default App;
