import React, { useEffect, useState } from "react";
import axios from "axios";
import "./feedback.css";

const AdminFeedbackComponent = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = feedbacks.slice(indexOfFirstRecord, indexOfLastRecord);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(feedbacks.length / recordsPerPage);

  useEffect(() => {
    // Fetch feedback data from the backend API
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get("http://localhost:3005/api/feedbacks");
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className="outercontainer">
      <h3>Feedbacks Received</h3>
      <table className="inner-container1">
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Housekeeper Id</th>
            <th>Housekeeper Name</th>
            <th>Rating</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((feedback) => (
            <tr key={feedback.id}>
              <td>{feedback.reqid}</td>
              <td>{feedback.hid}</td>
              <td>{feedback.hname}</td>
              <td>{feedback.rating} Stars</td>
              <td>{feedback.feedback}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {feedbacks.length > recordsPerPage && (
          <ul>
            {/* Previous Button */}
            {currentPage > 1 && (
              <li onClick={() => handlePageChange(currentPage - 1)}>
                &laquo; Prev
              </li>
            )}
            {/* Page Numbers */}
            {Array.from(
              { length: Math.ceil(feedbacks.length / recordsPerPage) },
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
  );
};

export default AdminFeedbackComponent;
