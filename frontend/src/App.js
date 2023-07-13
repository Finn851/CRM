import './App.css';
import Navbar from './parts/Navbar';
import { useEffect, useState } from 'react';
import Login from './parts/content/Login/Login';

const App = (props) => {
  const [data, setData] = useState(null)
  const [users, setUsers] = useState(null)
  const [auth, setAuth] = useState(null);

  const fetchData = () => {
    fetch('http://localhost:3001/dashboard/api').then((res) => res.json()).then(res => setData(res.data.data))
  }

  const fetchUsers = () => {
    fetch('http://localhost:3001/users').then((res) => res.json()).then(res => setUsers(res.users.users))
  }

  useEffect(() => {
    fetchData()
    fetchUsers()
  }, [])

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const login = (name, password) => {
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Обработка ответа от сервера
        console.log(data);
        if (data.accessToken) {
          localStorage.setItem('accessToken', data.accessToken);
          setAuth(true);
        }
        localStorage.setItem('userID', data.userID);
      })
      .catch((error) => {
        console.error('Ошибка:', error);
        // Обработка ошибки
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(name, password);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setAuth(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setAuth(false);
    fetch('/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userID: localStorage.getItem('userID'), isAuth: false}),
    })
  };

  if (auth) {
    return (
      <div className="App">
        {data && users && (
          <Navbar rerender={props.rerender} data={data} users={users} handleLogout={handleLogout} />
        )}
      </div>
    );
  } else {
    return (
      <div className="App">
        <Login handleSubmit={handleSubmit} name={name} setName={setName} password={password} setPassword={setPassword}/>
      </div>
    );
  }
}

export default App;
