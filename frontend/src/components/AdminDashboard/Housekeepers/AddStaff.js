import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "./addStaff.css";
import axios from "axios";

const AddStaff = () => {
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:3005/api/students");
        setHousekeepers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [housekeepers, setHousekeepers] = useState([]);
  const [errors, setErrors] = useState("");

  const generateUniqueID = async () => {
    return "HK" + Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit random number
  };

  const handleRegistraion = async () => {
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

    const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailValidation.test(email)) {
      setErrors("Please enter a valid email address");
      return;
    }

    const PhoneValidation = /^\d+$/;
    if (!PhoneValidation.test(phoneNumber)) {
      setErrors("Please enter a valid phone number (only numbers are allowed)");
      return;
    }
    try {
      const newhid = await generateUniqueID();
      let dataObj = {};
      dataObj.hid = newhid;
      dataObj.fname = firstName;
      dataObj.lname = lastName;
      dataObj.email = email;
      dataObj.country = country;
      dataObj.state = state;
      dataObj.phone = phoneNumber;
      dataObj.city = city;
      dataObj.gender = gender;
      dataObj.status = "inactive";
      dataObj.reqid = [];
      await axios
        .post("http://localhost:3005/api/staff", dataObj)
        .then((resData) => {
          alert("Record Added");
        });
      // Reset form fields after successful registration
      setFirstName("");
      setLastName("");
      setEmail("");
      setCountry("");
      setState("");
      setCity("");
      setPhoneNumber("");
      setGender("");
    } catch (error) {
      console.error("Error registering staff:", error);
      alert("Error registering staff. Please try again later.");
    }
  };

  return (
    <div className="container">
      <div className="img">
        <img src="/cleaning.avif" alt="" />
      </div>
      <div className="form-container">
        <form className="form">
          <h2>Housekeeper Registration</h2>
          <div className="input-name">
            <FaUser className="icon" />
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

            <FaUser className="icon" />
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
            <MdEmail className="icon" />
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
            Gender :
            <br />
            <label className="radio">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === "Female"}
                onChange={() => {
                  setGender("Female");
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

          <button
            type="button"
            onClick={() => handleRegistraion()}
            className="btn"
          >
            Register
          </button>
        </form>
        {errors && <div className="errorMessage">{errors}</div>}
      </div>
    </div>
  );
};

export default AddStaff;