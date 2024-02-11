/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import Staff from "../AdminDashboard/Housekeepers/Staff";
import AddStaff from "../AdminDashboard/Housekeepers/AddStaff";
import Students from "../AdminDashboard/Students/Students";
import FeedbackForm from "../StudentDashboard/Feedback/feedback";
import AdminFeedbackComponent from "../AdminDashboard/Feedback/Feedback";
import StudentRequest from "../StudentDashboard/MyRequests/StudentRequests";
import RequestStatus from "../StudentDashboard/Status/StudentRstatus";
import Profile from "../StudentDashboard/Profile/Profile";
import AdminRequest from "../AdminDashboard/Requests/AdminRequest";

const Dashboard = () => {
  const navigate = useNavigate();
  const [prop1, setProp1] = useState("");
  const [name, setName] = useState("");
  const [userEmail, setUseremail] = useState("");
  const [route, setRoute] = useState("dashboard");

  const handleRoutes = (e) => {
    setRoute("");
    setTimeout(() => setRoute(e), 0);
  };
  useEffect(() => {
    try {
      setProp1(sessionStorage.getItem("UserType"));
      setUseremail(sessionStorage.getItem("UserEmail"));
      setName(sessionStorage.getItem("UserName"));
      console.log("UserName");
    } catch (error) {
      console.log("Error:", error);
    }
  }, []);
  function login() {
    sessionStorage.removeItem("user-token");
    sessionStorage.removeItem("UserType");
    sessionStorage.removeItem("UserName");
    sessionStorage.removeItem("UserEmail");
    navigate("/");
  }

  return (
    <div>
      <div className="header">
        <h6 className="logo">HomeCare Pro</h6>

        {prop1 === "Student" && <h1 className="textheader">Welcome {name}</h1>}
        {prop1 === "Admin" && <h1 className="textheader">Welcome Admin</h1>}
      </div>
      <div className="mainContainer">
        <div className="sidebar ">
          <div
            className="sidebar-item "
            onClick={() => handleRoutes("dashboard")}
          >
            <i className="bi bi-tv"></i>
            Dashboard
          </div>
          {prop1 === "Student" && (
            <div>
              <div
                className="sidebar-item "
                onClick={() => handleRoutes("studentrequest")}
              >
                <i className="bi bi-telegram"></i>My Requests
              </div>
              <div
                className="sidebar-item "
                onClick={() => handleRoutes("studentstatus")}
              >
                <i className="bi bi-joystick"></i>Status
              </div>
              <div
                className="sidebar-item "
                onClick={() => handleRoutes("profile")}
              >
                <i className="bi bi-person-circle"></i>Profile
              </div>
              <div
                className="sidebar-item "
                onClick={() => handleRoutes("studentfeedback")}
              >
                <i className="bi bi-card-checklist"></i>Feedback
              </div>
            </div>
          )}
          {prop1 === "Admin" && (
            <div>
              <div
                className="sidebar-item"
                onClick={() => handleRoutes("adminrequest")}
              >
                <i className="bi bi-telegram"></i>Requests
              </div>
              <div
                className="sidebar-item"
                onClick={() => handleRoutes("housekeepers")}
              >
                <i className="bi bi-person-circle"></i>Housekeepers
              </div>
              <div
                className="sidebar-item "
                onClick={() => handleRoutes("students")}
              >
                <i className="bi bi-person-bounding-box"></i>Students
              </div>
              <div
                className="sidebar-item "
                onClick={() => handleRoutes("adminfeedback")}
              >
                <i className="bi bi-card-checklist"></i>Feedbacks
              </div>
            </div>
          )}
          <div className="sidebar-item " onClick={login}>
            <i className="bi bi-box-arrow-left"></i>Logout
          </div>
        </div>

        {/* MAIN CONTENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

        <div className="mainContent">
          {route === "dashboard" && (
            <div className="maindashboard">
              <div>
                {/* PLACE YOUR DASHBOARD CODE HERE  */}
                <div className="container2">
                  <h3 style={{ textAlign: "center" }}>DASHBOARD</h3>
                  <div className="main__cards">
                    <div className="card c1">
                      <div className="card_inner">
                        <p className="text-primary-p">Completed Requests</p>
                        <span className="font-bold text-title">50+</span>
                      </div>
                    </div>

                    <div className="card c2">
                      <div className="card_inner">
                        <p className="text-primary-p">Suggestions</p>
                        <span className="font-bold text-title">50+</span>
                      </div>
                    </div>

                    <div className="card c3">
                      <div className="card_inner">
                        <p className="text-primary-p">Feedback</p>
                        <span className="font-bold text-title">100+</span>
                      </div>
                    </div>

                    <div className="card c4">
                      <div className="card_inner">
                        <p className="text-primary-p">Complaints</p>
                        <span className="font-bold text-title">25+</span>
                      </div>
                    </div>
                  </div>
                  <h3 style={{ textAlign: "center" }}>SERVICES</h3>
                  <div
                    id="myCarousel"
                    class="carousel slide"
                    data-ride="carousel"
                  >
                    <ol class="carousel-indicators">
                      <li
                        data-target="#myCarousel"
                        data-slide-to="0"
                        class="active"
                      ></li>
                      <li data-target="#myCarousel" data-slide-to="1"></li>
                      <li data-target="#myCarousel" data-slide-to="2"></li>
                    </ol>

                    <div class="carousel-inner">
                      <div class="item active">
                        <img src="clean.jpg" width="60%" alt="" />
                      </div>

                      <div class="item">
                        <img src="dust.jpg" width="60%" alt="" />
                      </div>

                      <div class="item">
                        <img src="mopp.jpg" width="60%" alt="" />
                      </div>
                    </div>

                    <a
                      class="left carousel-control"
                      href="#myCarousel"
                      data-slide="prev"
                    >
                      <span class="glyphicon glyphicon-chevron-left"></span>
                      <span class="sr-only">Previous</span>
                    </a>
                    <a
                      class="right carousel-control"
                      href="#myCarousel"
                      data-slide="next"
                    >
                      <span class="glyphicon glyphicon-chevron-right"></span>
                      <span class="sr-only">Next</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/*  Display the appropriate content based on which tab is selected. */}
          {/* AdminTabs */}
          {route === "housekeepers" && (
            <div>
              <Staff />
              {
                <div className="addStaff">
                  <button
                    className="btn btn-success p-2 addStaffbutton"
                    onClick={() => handleRoutes("addstaff")}
                  >
                    Add Staff
                  </button>
                </div>
              }
            </div>
          )}
          {route === "addstaff" && <AddStaff />}
          {route === "students" && <Students />}
          {route === "studentfeedback" && <FeedbackForm />}
          {route === "adminfeedback" && <AdminFeedbackComponent />}
          {route === "studentrequest" && <StudentRequest />}
          {route === "profile" && <Profile />}
          {route === "adminrequest" && <AdminRequest />}
          {route === "studentstatus" && <RequestStatus userEmail={userEmail} />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;