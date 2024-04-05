/* eslint-disable no-unused-vars */

import React, { useEffect,useState} from 'react';
import './LoginForm.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
    const [loginStatus, setLoginStatus] = useState('');
  useEffect(() => {
    const inputs = document.querySelectorAll('.form-control input');
    const labels = document.querySelectorAll('.form-control label');
    labels.forEach(label => {
      label.innerHTML = label.innerText
        .split('')
        .map((letter, idx) => `<span style="transition-delay: ${idx * 50}ms">${letter}</span>`)
        .join('');
    });
  }, []); 

  const handleSignupClick = () => {
    navigate('/signup');
  };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/login',{email, password})
    .then((res) => {
      const responseData = res.data;
      // Split the response data into separate JSON objects
      const splitData = responseData.split('}{');
      // Parse each JSON object individually
      const parsedData = splitData.map((item, index) => {
        // Add back the curly braces to the first and last items
        if (index === 0) {
          return JSON.parse(item + '}');
        } else if (index === splitData.length - 1) {
          return JSON.parse('{' + item);
        }
        return JSON.parse('{' + item + '}');
      });
      // Extract tokens from parsed data
      const { token, refreshToken } = parsedData[1];
      console.log(token, refreshToken);
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken)
      setLoginStatus('Login Successful');
      
      setTimeout(() => {
          navigate('/'); 
        }, 2000);
     
    })
    .catch((error) => {
      setLoginStatus('Wrong Credentials!');
    });
  };

  return (
    <form className='loginform' onSubmit={handleSubmit}>
      <h1>Login</h1>
      <div className="form-control">
        <input type="email" required  value={email} onChange={(e) => setEmail(e.target.value) }/>
        <label>Email</label>
      </div>

      <div className="form-control">
        <input type="password" required   value={password} onChange={(e) => setPassword(e.target.value)}/>
        <label>Password</label>
      </div>
      <div class="box-3">
     <button class="btn btn-three" >
        <span>Login</span>
        </button>
        </div>
        <p>Don't have an account? <button className="Signupbtn" onClick={handleSignupClick}>Signup here</button></p>
        {loginStatus && <p className="loginStatus">{loginStatus}</p>}
    </form>
  );
};

export default LoginForm;
