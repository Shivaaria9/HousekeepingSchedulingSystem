import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "./registration.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AddStudent = () => {
  const [userData, setUserData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [secquestion, setSecQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showrePassword, setReShowPassword] = useState(false);
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

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
  const stdidGenerate = async () => {
    return "ST" + Math.floor(100000 + Math.random() * 900000);
  };
  const generatefloorNo = async () => {
    return Math.floor(Math.random() * 5) + 1;
  };
  const generatetroomNo = async () => {
    return Math.floor(Math.random() * 10) + 1;
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglerePasswordVisibility = () => {
    setReShowPassword(!showrePassword);
  };
  const securityQuestions = [
    "What is your mother's maiden name?",
    "What is the name of your first pet?",
    "What is your favorite movie?",
    "What city were you born in?",
    "What is the name of your elementary school?",
  ];
  const isEmailValid = (email) => {
    const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailValidation.test(email);
  };

  const isPasswordValid = (password) => {
    if (password.length < 8) {
      return {
        valid: false,
        error: "Password should contain at least 8 characters",
      };
    }
    if (!/[A-Z]/.test(password)) {
      return {
        valid: false,
        error: "Password should contain at least 1 uppercase letter",
      };
    }
    if (!/[a-z]/.test(password)) {
      return {
        valid: false,
        error: "Password should contain at least 1 lowercase letter",
      };
    }
    if (!/\d/.test(password)) {
      return {
        valid: false,
        error: "Password should contain at least 1 digit",
      };
    }
    if (!/[\W_]/.test(password)) {
      return {
        valid: false,
        error: "Password should contain at least 1 special character",
      };
    }
    return { valid: true };
  };
  function isValid() {
    const user = userData.find((user) => user.email === email.toLowerCase());
    const isValidPassword = isPasswordValid(password);
    if (!email || !password || !repassword) {
      setErrors("Email and Password are required.");
      return false;
    } else if (!isEmailValid(email)) {
      setErrors("Invalid Email Id");
      return false;
    } else if (user) {
      setErrors("This Email id is already registered !!");
      return false;
    } else if (!isValidPassword.valid) {
      setErrors(isValidPassword.error);
      return false;
    } else if (password !== repassword) {
      setErrors("Passwords should match");
      return false;
    } else if (secquestion === "") {
      setErrors("Please choose a security question");
      return false;
    } else if (answer === "") {
      setErrors("Please provide an answer for security question");
      return false;
    } else {
      return true;
    }
  }
  const handleRegistraion = async (e) => {
    e.preventDefault();
    setErrors("");
    if (
      !firstName ||
      !lastName ||
      !email ||
      !country ||
      !state ||
      !city ||
      !phoneNumber ||
      !gender
    ) {
      setErrors("All fields are required");
      return;
    }
    if (!isValid()) {
      return;
    }
    try {
      const newID = await stdidGenerate();
      const floorno = await generatefloorNo();
      const roomno = await generatetroomNo();
      let dataObj = {};
      dataObj.stdid = newID;
      dataObj.fname = firstName;
      dataObj.lname = lastName;
      dataObj.email = email;
      dataObj.country = country;
      dataObj.state = state;
      dataObj.city = city;
      dataObj.phone = phoneNumber;
      dataObj.secquestion = secquestion;
      dataObj.secanswer = answer;
      dataObj.password = password;
      dataObj.roomno = roomno;
      dataObj.floorno = floorno;
      dataObj.gender = gender;
      console.log(dataObj);
      await axios.post("http://localhost:3005/api/students", dataObj);
      alert("Student Registered Successfully");
      setFirstName("");
      setLastName("");
      setEmail("");
      setCountry("");
      setState("");
      setCity("");
      setPhoneNumber("");
      setGender("");
      setPassword("");
      setRepassword("");
      setAnswer("");
      setSecQuestion("");
      navigate("/");
    } catch (error) {
      console.error("Error registering student:", error);
      alert("Error registering student. Please try again later.");
    }
  };

  return (
    <div className="">
      <h2>Student Registration</h2>
      <div className="container">
        <div className="img">
          <img src="/user.png" alt="" style={{ width: "400px" }} />
        </div>
        <div className="form-container1">
          <form className="form">
            <div className="input-name">
              <FaUser className="icon1" />
              <input
                type="text"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  setErrors("");
                }}
                placeholder="First Name"
                className="name"
              />

              <span>&nbsp;&nbsp;</span>

              <FaUser className="icon1" />
              <input
                type="text"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  setErrors("");
                }}
                placeholder="Last Name"
                className="name"
              />
            </div>

            <div className="input-name">
              <MdEmail className="icon1" />
              <input
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors("");
                }}
                placeholder="Email"
                className="text-name"
              />
            </div>

            <div className="input-name">
              <input
                type="text"
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  setErrors("");
                }}
                placeholder="Country"
                className="t-name"
              />

              <span>&nbsp;&nbsp;&nbsp;</span>

              <input
                type="text"
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                  setErrors("");
                }}
                placeholder="State"
                className="t-name"
              />
            </div>

            <div className="input-name">
              <input
                type="text"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setErrors("");
                }}
                placeholder="City"
                className="t-name"
              />
              <span>&nbsp;&nbsp;&nbsp;</span>

              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  setErrors("");
                }}
                placeholder="Phone Number"
                className="t-name"
              />
            </div>
            <div className="input-name">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors("");
                }}
                placeholder="Password"
                className="t-name"
              />
              <p className="password" onClick={togglePasswordVisibility}>
                {showPassword ? (
                  <i class="bi bi-eye-slash"></i>
                ) : (
                  <i class="bi bi-eye"></i>
                )}
              </p>
              <span>&nbsp;&nbsp;&nbsp;</span>

              <input
                type={showrePassword ? "text" : "password"}
                value={repassword}
                onChange={(e) => {
                  setRepassword(e.target.value);
                  setErrors("");
                }}
                placeholder="ReType Password"
                className="t-name"
              />
              <p className="repassword" onClick={togglerePasswordVisibility}>
                {showrePassword ? (
                  <i class="bi bi-eye-slash"></i>
                ) : (
                  <i class="bi bi-eye"></i>
                )}
              </p>
            </div>
            <div className="input-name" style={{ overflow: "hidden" }}>
              <select
                className="text-name"
                id="Security-question"
                name="Security-question"
                value={secquestion}
                onChange={(e) => {
                  setSecQuestion(e.target.value);
                  setErrors("");
                }}
              >
                <option value="" align="center">
                  Select a security question
                </option>
                {securityQuestions.map((question, index) => (
                  <option
                    style={{ maxWidth: "200px" }}
                    key={index}
                    value={question}
                  >
                    {question}
                  </option>
                ))}
              </select>
            </div>
            {secquestion && (
              <div className="input-name">
                <input
                  className="t-name"
                  type="text"
                  id="Answer"
                  name="Answer"
                  value={answer}
                  onChange={(e) => {
                    setAnswer(e.target.value);
                    setErrors("");
                  }}
                  placeholder="Answer"
                  autoComplete="off"
                />
              </div>
            )}

            <div className="input-name">
              <label className="radio">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={() => {
                    setGender("female");
                    setErrors("");
                  }}
                />
                Female
                <span></span>
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={() => {
                    setGender("male");
                    setErrors("");
                  }}
                />
                Male
                <span></span>
              </label>
            </div>

            <button type="button" onClick={handleRegistraion} className="btn">
              Register
            </button>
            <p className="mt-2">
              Already a Member?
              <Link to="/" className="mb-3 mt-3 loginlink">
                Login
              </Link>
            </p>
            {errors && <div className="errorMessage">{errors}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;