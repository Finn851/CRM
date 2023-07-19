import './App.css';
import Navbar from './parts/Navbar';
import { useEffect, useState } from 'react';
import Login from './parts/content/Login/Login';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';


firebase.initializeApp({
  apiKey: "AIzaSyA6a2KrgINXs48kh46ujobBHHi2G4DOBSc",
  authDomain: "crm-app-290ad.firebaseapp.com",
  databaseURL: "https://crm-app-290ad-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "crm-app-290ad",
  storageBucket: "crm-app-290ad.appspot.com",
  messagingSenderId: "417688543189",
  appId: "1:417688543189:web:a39ee3eb737363807c675c",
  measurementId: "G-5LNV6GKBVK"
})

const App = (props) => {
  const [data, setData] = useState(null)
  const [users, setUsers] = useState(null)
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const database = firebase.database();
    const ref = database.ref('/data');

    const handleData = (snapshot) => {
      setData(snapshot.val());
    };

    ref.on('value', handleData);
    // Очистка прослушивателя при размонтировании компонента
    return () => {
      ref.off('value', handleData);
    };
  }, []);

  const fetchUsers = () => {
    fetch('http://localhost:3001/users').then((res) => res.json()).then(res => setUsers(res.users.users))
  }

  useEffect(() => {
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
