import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Login.css";
import axios from "axios";

const LoginComponent = () => {
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:3005/api/students");
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorField, setError] = useState("");
  const [userData, setUserData] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate();
  const location = useLocation();

  const validateEmail = (email) => {
    const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return emailPattern.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setError("");
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setError("");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email or password cannot be empty");
      return;
    }
    if (!validateEmail(email)) {
      setError("Invalid email-id");
      return;
    } else {
      Login(email, password);
    }
  };
  const Login = (email, password) => {
    setError("");
    const user = userData.find((user) => user.email === email.toLowerCase());

    if (!user) {
      setError("Unregistered Email Id");
      return;
    } else {
      if (user.password === password) {
        if (user.email === "admin@example.com") {
          sessionStorage.setItem("UserType", "Admin");
        } else {
          sessionStorage.setItem("UserEmail", email);
          sessionStorage.setItem("UserName", user.fname);
          console.log(sessionStorage.getItem("UserEmail"));
          sessionStorage.setItem("UserType", "Student");
          console.log(user.fname);
        }
        const queryString = location.search; // returns the query string from the current url
        let strReturnUrl = new URLSearchParams(queryString).get("returnUrl");
        if (strReturnUrl === null) {
          strReturnUrl = "/dashboard";
        }
        // In real-time apps, we will get the token from the server
        // JWT token is the popular token generation library
        let token = "ASJDFJF87ADF8745LK4598SAD7FAJSDF45JSDLFKAS";
        sessionStorage.setItem("user-token", token);
        navigate(strReturnUrl);
      } else {
        setError("Incorrect Password");
      }
    }
  };

  return (
    <div className="outer-container">
      <div className="container">
        <div className="form-container log-in-container">
          <form className="input-form">
            <h1 className="heading">Login</h1>
            <div className="formgroup">
              <input
                className="input"
                type="email"
                placeholder="Enter your email-id"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="formgroup">
              <input
                className="input"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
              />
              <p className="showPassword1" onClick={togglePasswordVisibility}>
                {showPassword ? (
                  <i class="bi bi-eye-slash"></i>
                ) : (
                  <i class="bi bi-eye"></i>
                )}
              </p>
            </div>
            <button type="button" className="submit" onClick={handleLogin}>
              Login
            </button>
            <Link
              to="/forgotpassword"
              className="mb-3 mt-3 link-success link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
            >
              Forgot Password
            </Link>
            <p className="d-inline">
              Not a Member?
              <Link
                to="/registration"
                className="mb-3 mt-3 link-success link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
              >
                SignUp
              </Link>
            </p>
            {errorField && (
              <div className="error-message text-danger">{errorField}</div>
            )}
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1 className="heading2">HomeCare Pro</h1>
              <p className="section">
                This is the place where you can schedule your comfortable time
                for cleaning purpose for HouseKeeper.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;