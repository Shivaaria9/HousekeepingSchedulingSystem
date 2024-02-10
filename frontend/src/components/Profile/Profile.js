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

      const matchingStudent = filteredStudents[0];

      if (matchingStudent) {
        setStudentDetails(matchingStudent);
        setSelectedStudent(matchingStudent);
      } else {
        console.error("Student not found");
      }
    } catch (error) {
      console.error("Error fetching student details:", error);
    }
  };

  const handleUpdate = () => {
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
     axios.put("http://localhost:3005/api/students", updatedStudent)
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
    setEditable(true);
  };

  return (
    <div className="maincontainer-student">
    {studentDetails && (
        <div className="innercontainer-student">
          <div className="profile-card-student">
            <div className="profile-header-student">
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
            <div className="profile-details-student">
              <div className="detail-student">
                <span className="label">Name:</span>
                <span className="value">
                  {studentDetails.fname} {studentDetails.lname}
                </span>
              </div>
              <div className="detail">
                <span className="label">Email:</span>
                <span className="value">{studentDetails.email}</span>
              </div>
              <div className="detail">
                <span className="label">Country:</span>
                <span className="value">{studentDetails.country}</span>
              </div>
              <div className="detail">
                <span className="label">State:</span>
                <span className="value">{studentDetails.state}</span>
              </div>
              <div className="detail">
                <span className="label">City:</span>
                <span className="value">{studentDetails.city}</span>
              </div>
              <div className="detail">
                <span className="label">Phone:</span>
                <span className="value">{studentDetails.phone}</span>
              </div>
              <div className="detail">
                <span className="label">Gender:</span>
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
              <div className="editStudent">
                 <table>
                  <tbody>
                    <tr>
                      <td>
                        <span className="label">First Name:</span>
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
                        <span className="label">Last Name:</span>
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
                        <span className="label">Email:</span>
                      </td>
                      <td colSpan="2">
                        <input
                          type="text"
                          id="email"
                          defaultValue={studentDetails.email}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span className="label">Country:</span>
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
                        <span className="label">State:</span>
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
                        <span className="label">City:</span>
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
                        <span className="label">Phone:</span>
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
                        <span className="label">Gender:</span>
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
  );
};

export default Profile;
