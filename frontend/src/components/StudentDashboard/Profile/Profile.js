import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  const [studentDetails, setStudentDetails] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [details, setDetails] = useState(false);
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    fetchStudentDetails();
  }, []);

  const fetchStudentDetails = async () => {
    try {
      const response = await axios.get("http://localhost:3005/api/students");
      const userEmail = sessionStorage.getItem("UserEmail");

      const filteredStudents = response.data.filter(
        (student) => student.email === userEmail
      );
      console.log(filteredStudents);
      setSelectedStudent(filteredStudents[0]);
      setStudentDetails(filteredStudents[0]);
    } catch (error) {
      console.error("Error fetching student details:", error);
    }
  };

  const handleUpdate = async () => {
    console.log(selectedStudent.stdid);
    setEditable(!editable);
    const updatedStudent = {
      ...selectedStudent,
      stdid: selectedStudent.stdid,
      fname: document.getElementById("fname").value,
      lname: document.getElementById("lname").value,
      email: document.getElementById("email").value,
      country: document.getElementById("country").value,
      state: document.getElementById("state").value,
      city: document.getElementById("city").value,
      phone: document.getElementById("phone").value,
      gender: document.getElementById("gender").value,
    };

    try {
      await axios
        .put("http://localhost:3005/api/students", updatedStudent)
        .then((resData) => {
          alert("Updated");
        });
      setStudentDetails(updatedStudent);
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const handleBack = () => {
    setDetails(!details);
  };

  const editSelected = () => {
    // setStudentDetails(false);
    setEditable(true);
  };

  return (
    <div className="maincontainer">
      <div className="outercontainer">
        {studentDetails && (
          <div className="innercontainer">
            <div className="profile-card">
              <div className="profile-header">
                {studentDetails.gender === "Female" ? (
                  <img
                    src="profile1.png"
                    alt="Housekeeper Avatar"
                    className="avatar"
                  />
                ) : (
                  <img
                    src="profile2.png"
                    alt="Housekeeper Avatar"
                    className="avatar"
                  />
                )}
              </div>
              <div className="profile-details">
                <div className="detail">
                  <span
                    className="label"
                    style={{ textAlign: "start", paddingTop: "3px" }}
                  >
                    First Name:
                  </span>
                  <span className="value">{studentDetails.fname}</span>
                </div>
                <div className="detail">
                  <span
                    className="label"
                    style={{ textAlign: "start", paddingTop: "3px" }}
                  >
                    Name:
                  </span>
                  <span className="value">{studentDetails.lname}</span>
                </div>
                <div className="detail">
                  <span
                    className="label"
                    style={{ textAlign: "start", paddingTop: "3px" }}
                  >
                    Email:
                  </span>
                  <span className="value">{studentDetails.email}</span>
                </div>
                <div className="detail">
                  <span
                    className="label"
                    style={{ textAlign: "start", paddingTop: "3px" }}
                  >
                    Country:
                  </span>
                  <span className="value">{studentDetails.country}</span>
                </div>
                <div className="detail">
                  <span
                    className="label"
                    style={{ textAlign: "start", paddingTop: "3px" }}
                  >
                    State:
                  </span>
                  <span className="value">{studentDetails.state}</span>
                </div>
                <div className="detail">
                  <span
                    className="label"
                    style={{ textAlign: "start", paddingTop: "3px" }}
                  >
                    City:
                  </span>
                  <span className="value">{studentDetails.city}</span>
                </div>
                <div className="detail">
                  <span
                    className="label"
                    style={{ textAlign: "start", paddingTop: "3px" }}
                  >
                    Phone:
                  </span>
                  <span className="value">{studentDetails.phone}</span>
                </div>
                <div className="detail">
                  <span
                    className="label"
                    style={{ textAlign: "start", paddingTop: "3px" }}
                  >
                    Gender:
                  </span>
                  <span className="value">{studentDetails.gender}</span>
                </div>
                <i
                  className="bi bi-pencil-square"
                  style={{ cursor: "pointer" }}
                  onClick={editSelected}
                >
                  Edit
                </i>
              </div>
              {editable && (
                <div className="editHouskeeper">
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <span
                            className="label"
                            style={{ textAlign: "start", paddingTop: "3px" }}
                          >
                            First Name:
                          </span>
                        </td>
                        <td>
                          <input
                            type="text"
                            id="fname"
                            defaultValue={studentDetails.fname}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span
                            className="label"
                            style={{ textAlign: "start", paddingTop: "3px" }}
                          >
                            Last Name:
                          </span>
                        </td>
                        <td>
                          <input
                            type="text"
                            id="lname"
                            defaultValue={studentDetails.lname}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span
                            className="label"
                            style={{ textAlign: "start", paddingTop: "3px" }}
                          >
                            Email:
                          </span>
                        </td>
                        <td colSpan="2">
                          <input
                            type="text"
                            disabled
                            id="email"
                            defaultValue={studentDetails.email}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span
                            className="label"
                            style={{ textAlign: "start", paddingTop: "3px" }}
                          >
                            Country:
                          </span>
                        </td>
                        <td colSpan="2">
                          <input
                            type="text"
                            id="country"
                            defaultValue={studentDetails.country}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span
                            className="label"
                            style={{ textAlign: "start", paddingTop: "3px" }}
                          >
                            State:
                          </span>
                        </td>
                        <td colSpan="2">
                          <input
                            type="text"
                            id="state"
                            defaultValue={studentDetails.state}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span
                            className="label"
                            style={{ textAlign: "start", paddingTop: "3px" }}
                          >
                            City:
                          </span>
                        </td>
                        <td colSpan="2">
                          <input
                            type="text"
                            id="city"
                            defaultValue={studentDetails.city}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span
                            className="label"
                            style={{ textAlign: "start", paddingTop: "3px" }}
                          >
                            Phone:
                          </span>
                        </td>
                        <td colSpan="2">
                          <input
                            type="text"
                            id="phone"
                            defaultValue={studentDetails.phone}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span
                            className="label"
                            style={{ textAlign: "start", paddingTop: "3px" }}
                          >
                            Gender:
                          </span>
                        </td>
                        <td colSpan="2">
                          <input
                            type="text"
                            id="gender"
                            defaultValue={studentDetails.gender}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <button onClick={handleUpdate} className="links-btn">
              Update
            </button>{" "}
            <button onClick={handleBack} className="links-btn">
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
