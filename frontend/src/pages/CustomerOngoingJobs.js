import React, { useState, useEffect } from "react";
import httpClient from "../httpClient";
import "../css/CustomerOngoingJobs.css";

function CustomerOngoingJobs() {
  // Sample ongoing jobs (you would fetch this data from the backend)
  const [ongoingJobs, setOngoingJobs] = useState([]);
  const [status, setStatus] = useState("Ongoing");

  //THESE VALUES WOULD BE LOADED FROM BACKEND FROM USER ACCOUNTS, ETC...

  // Handle the "Pay" button click
  const handlePayment = async (jobId) => {
    try {
      const resp = await httpClient.post("/make_payments", { jobId });
      // Add success or update logic here if necessary
      setStatus = "Complete";
    } catch (error) {
      console.log("Error making payment");
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get("/get_all_offer_listings");
        console.log(resp.data);
        setOngoingJobs(resp.data);
      } catch (error) {
        console.log("Error retrieving available job listings");
      }
    })();
  }, []);

  return (
    <div className="app-container">
      {/* Header Section */}
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
                {job.job_type} - {job.location}
              </h2>
              <p>
                <strong>Address:</strong> {job.address}
              </p>
              <p>
                <strong>Start Date/Time:</strong>{" "}
                {new Date(job.start_date).toLocaleString()}
              </p>
              <p>
                <strong>Pay Per Hour:</strong> R{job.pay_per_hour}
              </p>
              <p>
                <strong>Hours Per Day:</strong> {job.hours_per_day}
              </p>
              <p>
                <strong>Number of Days:</strong> {job.num_days}
              </p>
              <p>
                <strong>Total Pay:</strong>{" "}
                {`R${job.pay_per_hour * job.hours_per_day * job.num_days}`}
              </p>

              {/* Display job status */}
              <p>
                <strong>Status:</strong> {status}
              </p>

              {/* Pay Button, visible only for ongoing jobs */}

              {status === "ongoing" ? (
                <button
                  className="pay-button"
                  onClick={() => handlePayment(job.id)}
                >
                  Pay
                </button>
              ) : (
                <div
                  className="completed-rectangle"
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                >
                  Completed!
                </div>
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
