import React, { useState, useEffect } from "react";
import httpClient from "../httpClient";
import "../css/CustomerOngoingJobs.css";

function CustomerOngoingJobs() {
  // Sample ongoing jobs (you would fetch this data from the backend)
  const [ongoingJobs, setOngoingJobs] = useState([]);

  //THESE VALUES WOULD BE LOADED FROM BACKEND FROM USER ACCOUNTS, ETC...

  // Handle the "Pay" button click
  const handlePayment = async (jobId) => {
    try {
      const resp = await httpClient.post("/make_payments", { jobId });
      // Add success or update logic here if necessary
    } catch (error) {
      console.log("Error making payment");
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get("/get_all_offer_listings");
        // Filter jobs to include only those with 'ongoing' or 'complete' states
        const filteredJobs = resp.data.filter(
          (job) => job.state === "ongoing" || job.state === "complete"
        );
        setOngoingJobs(filteredJobs);
      } catch (error) {
        console.log("Error retrieving available job listings");
      }
    })();
  }, []);

  return (
    <div className="app-container">
      {/* Header Section */}
      <button className="pay-button" onClick={() => handlePayment(1)}>
        THIS IS SO WE CAN TEST PAY
      </button>
      <header className="app-header">
        <h1>JobMatch SA</h1>
        <p>Your Ongoing Jobs</p>
      </header>

      {/* Main Action Section */}
      <main className="app-main">
        <div className="job-options">
          {ongoingJobs.map((job) => (
            <div
              className={`job-card ${
                job.state === "complete" ? "complete" : "ongoing"
              }`}
              key={job.id}
            >
              <h2>
                {job.jobType} - {job.location}
              </h2>
              <p>
                <strong>Address:</strong> {job.address}
              </p>
              <p>
                <strong>Start Date/Time:</strong>{" "}
                {new Date(job.startDate).toLocaleString()}
              </p>
              <p>
                <strong>End Date:</strong>{" "}
                {new Date(job.endDate).toLocaleString()}
              </p>
              <p>
                <strong>Hours Per Day:</strong> {job.hoursPerDay}
              </p>
              <p>
                <strong>Number of Days:</strong> {job.numDays}
              </p>
              <p>
                <strong>Total Pay:</strong>{" "}
                {`R${job.payPerHour * job.hoursPerDay * job.numDays}`}
              </p>

              {/* Display job status */}
              <p>
                <strong>Status:</strong>{" "}
                {job.state === "complete" ? "Complete" : "Ongoing"}
              </p>

              {/* Pay Button, visible only for ongoing jobs */}
              {job.state === "ongoing" && (
                <button
                  className="pay-button"
                  onClick={() => handlePayment(job.id)}
                >
                  Pay
                </button>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="footer-nav">
        <div className="nav-icon home"></div>
        <div className="nav-icon search"></div>
        <div className="nav-icon notifications"></div>
        <div className="nav-icon profile"></div>
      </footer>
    </div>
  );
}

export default CustomerOngoingJobs;
