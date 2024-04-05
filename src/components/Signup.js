/* eslint-disable no-unused-vars */

import React, { useEffect} from 'react';
import './Signup.css';
import { useNavigate} from 'react-router-dom';
import { useState }from 'react';
import axios from 'axios';
const Signup = () => {
    const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [signupStatus, setSignupStatus] = useState('');
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate('/login');
  };
  const handlechange=(c)=>{
   
    c.preventDefault()  //the default behaviour will be that this function will try to navigate to the route below on click but we dont want that so we use preventDefault()
    axios.post('http://localhost:8080/Signup',{name, password, email})
    .then((res) => {
        setSignupStatus('Signup Successful');
        setTimeout(() => {
            navigate('/login'); // Navigate to login page after 2 seconds
          }, 2000);
    })
    .catch((error) => {
      alert('error occured:' + error.message)
    });
}
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

  return (
    <div>
    <form className='Signup' onSubmit={handlechange}>
      <h1>SignUp</h1>
      <div className="form-control">
        <input type="text" required onChange={(e)=>setName(e.target.value)}/>
        <label>Name</label>
      </div>
      <div className="form-control">
        <input type="email"  onChange={(e)=>setEmail(e.target.value)}required />
        <label>Email</label>
      </div>
      <div className="form-control">
        <input type="password"  onChange={(e)=>setPassword(e.target.value)} required />
        <label>Password</label>
      </div>
      <div class="box-3">
     <button class="btn btn-three" type="submit"  >
        <span>SignUp</span>
        </button>
        </div>
        <p>Already have an account? <button className="Loginbtn" onClick={handleLoginClick}>Login here</button></p>
     {signupStatus && <p className="signupStatus">{signupStatus}</p>}
 </form>

     </div>
  );
};

export default Signup;

