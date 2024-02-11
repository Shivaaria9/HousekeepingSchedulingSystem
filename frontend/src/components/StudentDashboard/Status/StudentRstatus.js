import React, { useState, useEffect } from "react";
import axios from "axios";

const RequestStatus = ({ userEmail }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const userData = await axios.get(`http://localhost:3005/api/students`);
        const user = userData.data.filter((user) => user.email === userEmail);
        const id = user[0].stdid;
        const response = await axios.get(`http://localhost:3005/api/requests`);
        const filteredRequests = response.data.filter(
          (item) => item.stdid === id
        );
        // Ensure that setRequests is called after filteredRequests is populated
        setRequests(filteredRequests);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, [userEmail]);

  return (
    <div>
      {/* <h6>Request Status</h6> */}
      <table className="housekeepers-table">
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Date</th>
            <th>Timings</th>
            <th>Requests</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.reqid}>
              <td>{request.reqid}</td>
              <td>{request.date}</td>
              <td>{request.timings}</td>
              <td>
                <ul className="p-0" style={{ "list-style-type": "none" }}>
                  {request.reqs.map((req, index) => (
                    <li key={index} className="requests">
                      {req}
                    </li>
                  ))}
                </ul>
              </td>
              <td>{request.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestStatus;