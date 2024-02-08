import React, { useState } from 'react';
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [result, setResult]  = useState(""); 
  const navigate = useNavigate(); 

 
  // Function to validate Email
  const validateEmail = (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the entered credentials are for a student
    if (email !== 'admin@gmail.com') {
      if (!value.match(emailPattern)) {
        setEmailError('Invalid email format');
      } else {
        setEmailError('');
      }
    }
  };

  // Function to validate Password
  const validatePassword = (value) => {
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    // Check if the entered credentials are for a student
    if (email !== 'admin@gmail.com') {
      if (!value.match(passwordPattern)) {
        setPasswordError('Password: At least 6 characters, one uppercase letter, one number, and one special character.');
      } else {
        setPasswordError('');
      }
    }
  };

  const handleLogin = async () => {
    // Validate admin credentials
    if (email === 'admin@gmail.com' && password === 'admin@123') {
      // Navigate to admin dashboard
      console.log('Admin login successful!');
      alert('Admin Login Successful');
      navigate("/AdminDash");
      return;
    }

    // Validate student credentials
    validateEmail(email);
    validatePassword(password);

    if (!emailError && !passwordError) {
      // If both email and password are valid, proceed with the login
      try {
        let url = "http://localhost:3005/api/students/login";
        const response = await axios.post(url, { email, password });
        if (response.data.success) {
          console.log('Student login successful!');
          alert('Student Login Successful');
          navigate("/Dashboard");
        } else {
          setResult(response.data.message);
          if (response.data.message === 'User not found' || response.data.message === 'Incorrect password') {
            alert("Please enter correct Email-Id or password");
          }
        }
      } catch (error) {
        console.error('Error during student login:', error);
        setErrorMessage('Error during login. Please try again.');
      }
    }
  };
  
  return (
    <div className="outer-container">
      <div className="container">
        <div className="form-container log-in-container">
          <form>
            <h1>Login</h1>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }}
            />
            {emailError && <p className="error-message">{emailError}</p>}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword(e.target.value);
              }}
            />
            {passwordError && <p className="error-message">{passwordError}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
               <div className='links'>
               <Link to="/ForgotPassword" style={{ textDecoration: 'none', marginTop:'15px' , color: '#19725D' }}>Forgot Password</Link>
              <label>
                Not a Member? <Link to="/Register" style={{ textDecoration: 'none' , marginTop:'10px',color: '#19725D' }}>Sign Up</Link>
              </label>
              </div>
              <button type="button" onClick={handleLogin}>
              Login
            </button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1>HouseKeeper Scheduling system</h1>
              <p>This is the place where you can schedule your comfortable time for cleaning purposes for HouseKeeper.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
