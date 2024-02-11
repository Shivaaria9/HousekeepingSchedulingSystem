import React, { useEffect, useState } from "react";
import "./studentreq.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

const StudentRequest = () => {
  const [errors, setErrors] = useState("");
  const [stdid, setStdid] = useState("");
  const [studentEmail, setstudentEmail] = useState("");
  const currentDate = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);
  const [requestDetails, setRequestDetails] = useState({
    date: formattedDate,
    selectedTime: "",
    requestTypes: [],
  });
  useEffect(() => {
    setstudentEmail(sessionStorage.getItem("UserEmail"));
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:3005/api/students");
        const userData = response.data.filter(
          (user) => user.email === studentEmail
        );
        if (userData.length > 0) {
          // Get all request IDs associated with the user
          setStdid(userData[0].stdid);
          console.log(stdid);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [stdid, studentEmail]);
  const generateUniqueID = async () => {
    return "RQ" + Math.floor(100000 + Math.random() * 900000);
  };
  const handleChange = async (e) => {
    const { name, value, checked } = e.target;
    if (name === "requestType") {
      const updatedRequestTypes = checked
        ? [...requestDetails.requestTypes, value]
        : requestDetails.requestTypes.filter((type) => type !== value);
      setTimeout(() => {
        setRequestDetails({
          ...requestDetails,
          requestTypes: updatedRequestTypes,
        });
      }, 0);
    } else if (name === "selectAll") {
      const allOptions = checked ? requestOptions : [];
      setTimeout(() => {
        setRequestDetails({ ...requestDetails, requestTypes: allOptions });
      }, 0);
    } else {
      setRequestDetails({ ...requestDetails, [name]: value });
    }
  };
  const handleDateChange = (date) => {
    setRequestDetails({ ...requestDetails, date });
  };

  const handleTimeClick = (selectedTime) => {
    setRequestDetails({ ...requestDetails, time: selectedTime, selectedTime });
  };
  const generateTimeCells = () => {
    const timeSlots = [];
    const startTime = 9;
    const endTime = 17;

    for (let hour = startTime; hour <= endTime; hour++) {
      for (let minute of ["00", "30"]) {
        const period = hour >= 12 ? "PM" : "AM";
        const fh = hour % 12 || 12;
        const timeSlot = `${fh}:${minute} ${period}`;
        timeSlots.push(
          <div
            key={timeSlot}
            className={`cell py-1 ${
              requestDetails.selectedTime === timeSlot ? "selected" : ""
            }`}
            onClick={(e) => {
              handleTimeClick(timeSlot);
              setErrors("");
            }}
          >
            <span>&nbsp;</span>
            {timeSlot}
          </div>
        );
      }
    }

    return <div className="time-slots">{timeSlots}</div>;
  };
  const handleFeedback = async (e) => {
    e.preventDefault();
    if (
      !requestDetails.date ||
      !requestDetails.time ||
      !requestDetails.requestTypes
    ) {
      setErrors("Please Select Date,Time and Requests from above");
      return false;
    }
    try {
      const newID = await generateUniqueID();
      let dataObj = {};
      dataObj.reqid = newID;
      dataObj.date = requestDetails.date;
      dataObj.timings = requestDetails.time;
      dataObj.reqs = requestDetails.requestTypes;
      dataObj.status = "Created";
      dataObj.stdid = stdid;
      await axios.post("http://localhost:3005/api/requests", dataObj);
      await axios.put(
        `http://localhost:3005/api/students/request/${stdid}`,
        dataObj
      );
      console.log(requestDetails);
      alert("Request created Successfully");
      // alert("Request created Successfully");
      //   dataObj.reqid = newID;
    } catch {}
  };
  const requestOptions = [
    "Mopping",
    "Dusting",
    "Cleaning",
    "Sweeping",
    "Washroom Cleaning",
    "Bed Cleaning",
  ];

  return (
    <div className="card-container">
      <form>
        <div className="card1">
          <label className="title">
            <h4 className="design">Date:</h4>

            <Calendar
              onChange={(e) => {
                handleDateChange();
                setErrors("");
              }}
              value={requestDetails.date}
              className="calendar"
            />
          </label>
        </div>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <div className="card1">
          <label className="title">
            <h4 className="design">Time:</h4>
            {generateTimeCells()}
          </label>
        </div>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <div className="card1">
          <h4 className="design">Request:</h4>
          <hr />
          <div className="request">
            <label className="title checkbox">
              <input
                type="checkbox"
                name="selectAll"
                checked={
                  requestDetails.requestTypes.length === requestOptions.length
                }
                onChange={handleChange}
              />
              <span>&nbsp;&nbsp;</span>
              Select All
            </label>
            {requestOptions.map((option) => (
              <label key={option}className="checkbox">
                <input
                  type="checkbox"
                  name="requestType"
                  value={option}
                  checked={requestDetails.requestTypes.includes(option)}
                  onChange={(e) => {
                    handleChange(e);
                    setErrors("");
                  }}
                />
                <span>&nbsp;&nbsp;</span>
                {option}
              </label>
            ))}
          </div>
        </div>
        <br />
        <button type="button" className="btn create" onClick={handleFeedback}>
          Create
        </button>
        {errors && <div className="errorMessage">{errors}</div>}
      </form>
    </div>
  );
};

export default StudentRequest;