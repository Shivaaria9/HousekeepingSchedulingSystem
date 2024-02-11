import React, { useState, useEffect } from "react";
import axios from "axios";
import "./feedback.css";

const FeedbackForm = () => {
  const [requestIds, setRequestIds] = useState([]);
  const [selectedReqId, setSelectedReqId] = useState("");
  const [stdid, setStdid] = useState("");
  const [housekeeperName, sethousekeeperName] = useState("");
  const [housekeeperID, sethousekeeperID] = useState("");
  const [feedback, setFeedback] = useState("");
  const [studentEmail, setstudentEmail] = useState("");
  const [rating, setRating] = useState(null);

  useEffect(() => {
    // Fetch request IDs associated with the student's email
    try {
      setstudentEmail(sessionStorage.getItem("UserEmail"));
      // console.log(studentEmail);
    } catch {}
    const fetchRequestIds = async () => {
      try {
        // Replace 'studentEmail' with the actual student's email address
        const response = await axios.get(`http://localhost:3005/api/students`);
        const userData = response.data.filter(
          (user) => user.email === studentEmail
        );
        const newid = userData[0].stdid;
        setStdid(newid);
        if (userData.length > 0) {
          // Get all request IDs associated with the user
          const userRequestIds = userData.map((user) => user.reqid).flat();
          setRequestIds(userRequestIds);
          // console.log(userRequestIds);
        }
      } catch (error) {
        console.error("Error fetching request IDs:", error);
      }
    };

    fetchRequestIds();
  }, [studentEmail]);

  useEffect(() => {
    // Fetch housekeeper's name and ID based on selected request ID
    try {
      if (selectedReqId) {
        console.log(selectedReqId);
        const fetchRequestIds = async () => {
          const response = await axios.get(`http://localhost:3005/api/staff`);
          // console.log(response.data); // Log the entire response data
          const fildata = response.data.filter(
            (user) =>
              user.reqid && user.reqid.some((id) => id === selectedReqId)
          );
          if (fildata) {
            fildata.forEach((dataItem) => {
              sethousekeeperName(dataItem.fname + " " + dataItem.lname);
              sethousekeeperID(dataItem.hid);
            });
          }
        };

        fetchRequestIds();
      } else {
        sethousekeeperName("");
        sethousekeeperID("");
      }
    } catch {}
  }, [selectedReqId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send feedback data to backend API
    const feedbackData = {
      reqid: selectedReqId,
      hname: housekeeperName,
      hid: housekeeperID,
      rating: rating,
      feedback: feedback,
      stdid: stdid,
    };
    console.log(feedbackData);
    axios
      .post("http://localhost:3005/api/feedbacks", feedbackData)
      .then((response) => {
        alert("Feedback submitted successfully!");
        // Reset form fields
        setSelectedReqId("");
        setFeedback("");
      })
      .catch((error) => {
        console.error("Error submitting feedback:", error);
      });
  };

  return (
    <div className="container3">
      <form onSubmit={handleSubmit} className="feedback-form">
        {/* <h2 className="d-flex">Feedback Form</h2> */}
        <div className="form-group">
          <label htmlFor="requestId" className="form-label">
            Request ID:
          </label>
          <select
            id="requestId"
            value={selectedReqId}
            onChange={(e) => setSelectedReqId(e.target.value)}
            className="form-control"
          >
            <option value="">Select Request ID</option>
            {requestIds.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="housekeeperName" className="form-label">
            Housekeeper Name:
          </label>
          <input
            type="text"
            id="housekeeperName"
            value={housekeeperName}
            readOnly
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="housekeeperId" className="form-label">
            Housekeeper ID:
          </label>
          <input
            type="text"
            id="housekeeperId"
            value={housekeeperID}
            readOnly
            className="form-control"
          />
        </div>
        <div className="rating-inputs">
          {[1, 2, 3, 4, 5].map((value) => (
            <label key={value} className="radio-label">
              <input
                type="radio"
                name="rating"
                value={value}
                checked={rating === value}
                onChange={() => setRating(value)}
                className="radio-input"
              />
              <span className="radio-span"></span>
              {value}
            </label>
          ))}
        </div>
        <div className="form-group">
          <label htmlFor="feedback" className="form-label">
            Feedback:
          </label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="form-control"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;