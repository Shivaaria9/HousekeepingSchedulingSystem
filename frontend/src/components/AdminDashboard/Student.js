import React, { useState, useEffect } from "react";
import axios from "axios";
import "./student.css";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 7;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = students.slice(indexOfFirstRecord, indexOfLastRecord);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(students.length / recordsPerPage);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:3005/api/students");
      const sortedStudents = response.data.sort((a, b) => a.sid - b.sid);
      setStudents(sortedStudents);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  return (
    <div className="maincontainer">
      <div className="outercontainer">
        <h5>Students List</h5>
        <table className="students-table">
          <thead>
            <tr>
              <th>Sid</th>
              <th>Name</th>
              <th>Email</th>
              <th>FloorNo</th>
              <th>RoomNo</th>
              <th>Recent Req..</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((student) => (
              <tr key={student._id}>
                <td>{student.stdid}</td>
                <td>
                  {student.fname} {student.lname}
                </td>

                <td>{student.email}</td>
                <td>{student.floorno}</td>
                <td>{student.roomno}</td>
                {/*below is the code to display the last reqid*/}
                <td> {student.reqid && student.reqid.length > 0 ? student.reqid[student.reqid.length - 1] : ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {students.length > recordsPerPage && (
            <ul>
              {/* Previous Button */}
              {currentPage > 1 && (
                <li onClick={() => handlePageChange(currentPage - 1)}>
                  &laquo; Prev
                </li>
              )}
              {/* Page Numbers */}
              {Array.from(
                { length: Math.ceil(students.length / recordsPerPage) },
                (_, index) => (
                  <li
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={currentPage === index + 1 ? "active" : ""}
                  >
                    {index + 1}
                  </li>
                )
              )}
              {/* Next Button */}
              {currentPage !== totalPages && (
                <li onClick={() => handlePageChange(currentPage + 1)}>
                  Next &raquo;
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Students;