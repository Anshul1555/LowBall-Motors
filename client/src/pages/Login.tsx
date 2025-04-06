import React, { useState, FormEvent, ChangeEvent } from 'react';
// import { useNavigate } from 'react-router-dom'; 
import Auth from '../utils/auth'; 
import { login } from '../api/authAPI'; 
import '../css/login.css';

function Login() {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  // const navigate = useNavigate();  // Call useNavigate here directly in the component

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(loginData);
      
      Auth.login(data.token); 
      console.log('Login successful');
      
      // After successful login, navigate to /home
      // navigate('/Home');
    } catch (err) {
      console.error('Failed to login', err);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="container">
      <div className="login-box">
        <h1>Welcome</h1>
        <p>Please enter your credentials</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={loginData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
              autoComplete="username"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="btn">Login</button>
        </form>
        <div className="forgot-password">
          <a href="#">Forgot password?</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
