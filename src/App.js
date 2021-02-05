// import logo from './logo.svg';
import { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import './App.css';

function App() {
  const [regDataMsg, setDataMsg] = useState('');
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState([]);

  const [regData, setRegData] = useState({
    name: '',
    email: '',
    password: '',
    fname: 'Kim',
    lname: 'Jong Un'
  })


  const [loginData, setLoginData] = useState({
    name: '',
    password: ''
  })


  const handleChangeReg = (e) => {
    setRegData({
      ...regData,
      [e.target.name]: e.target.value
    })
  }

  const handleChangeLogin = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmitReg = (e) => {
    e.preventDefault();
    const body = {
      username: regData.name,
      email: regData.email,
      password: regData.password,
      first_name: regData.fname,
      last_name: regData.lname,
    };
    axios.post('https://team-c.herokuapp.com/register', body).then((res) => {
      // console.log('respon reg =>', res);
      if (res.data.status === 200) setDataMsg(res.data.message);
    })
  }

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    const body = {
      username: loginData.name,
      password: loginData.password
    }
    axios.post('https://team-c.herokuapp.com/login', body).then((res) => {
      console.log('respon login =>', res);
      if (res.data.status === 200) {
        setToken(res.data.data)
        setUserData(jwt_decode(res.data.data))
        localStorage.setItem('tokenku', res.data.data);
        localStorage.setItem('dataku', JSON.stringify(jwt_decode(res.data.data)))
      };
    })
  }

  useEffect(() => {
    if(token) {
      setUserData(JSON.parse(localStorage.getItem('dataku')));
    }
  }, [])

  // console.log('regData =>', regData);
  // console.log('loginData = >', loginData);
  console.log('token =>', token);
  console.log('userData =>', userData);

  return (
    <div className="App">
      <h1>Register</h1>
      <form>
        <p>Full Name</p>
        <input
          type="text"
          placeholder="Type your name here ..."
          name="name"
          onChange={handleChangeReg}
        />

        <p>Email</p>
        <input
          type="email"
          placeholder="Type your email here ..."
          name="email"
          onChange={handleChangeReg}
        />

        <p>Password</p>
        <input
          type="password"
          placeholder="Type your password here ..."
          name="password"
          onChange={handleChangeReg}
        />

        <br />
        <button onClick={handleSubmitReg} type="submit">Sign Up</button>
        <p>{regDataMsg}</p>
      </form>

      <p>-------------</p>
      <h1>Login</h1>
      <p>Username</p>
      <input
        type="text"
        placeholder="Type your username here"
        name="name"
        onChange={handleChangeLogin}
      />

      <p>Password</p>
      <input
        type="password"
        placeholder="Type your password here ..."
        name="password"
        onChange={handleChangeLogin}
      />

      <br />
      <button type="submit" onClick={handleSubmitLogin}>Log in</button>
      <p>Success login as: {userData.email}</p>

    </div>
  );
}

export default App;
