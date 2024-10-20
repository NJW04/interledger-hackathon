import React, { useState, useEffect } from "react";
import httpClient from "../httpClient";
import "../css/ApplicantViewOffers.css";

function ApplicantViewOffers() {
  const [jobOffers, setJobListings] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get("/get_all_offer_listings");
        console.log(resp.data);
        setJobListings(resp.data);
      } catch (error) {
        console.log("Error Receiving Job Listings");
      }
    })();
  }, []);

  // Handle offer acceptance
  const acceptOffer = async (offerId) => {
    try {
      // Show an alert confirming the acceptance
      alert(`You have accepted the offer for Job ID: ${offerId}`);

      // Make the POST request to the backend to accept the offer
      const resp = await httpClient.post("/accept_offer", { id: offerId });

      // Log the response and handle any UI updates
      console.log(resp.data.message);

      // Optionally update the UI to reflect that the offer has been accepted
    } catch (error) {
      console.error("Error accepting the offer:", error);
    }
  };

  // Handle offer rejection
  const rejectOffer = async (offerId) => {
    const resp = await httpClient.post("/reject_offer");
    //Delete from JobListingOfferTable
  };

  return (
    <div className="app-container">
      {/* Header Section */}
      <header className="app-header">
        <h1>JobMatch SA</h1>
        <p>Your Job Offers</p>
      </header>

      {/* Main Action Section */}
      <main className="app-main">
        <div className="job-options">
          {jobOffers.map((offer) => (
            <div className="job-card" key={offer.id}>
              <h2>
                {offer.job_type} - {offer.location}
              </h2>
              <p>
                <strong>Address:</strong> {offer.address}
              </p>
              <p>
                <strong>Start Date/Time:</strong>{" "}
                {new Date(offer.start_date).toLocaleString()}
              </p>
              <p>
                <strong>Hours Per Day:</strong> {offer.hours_per_day}
              </p>
              <p>
                <strong>Number of Days:</strong> {offer.num_days}
              </p>
              <p>
                <strong>Total Pay:</strong>{" "}
                {`R${
                  offer.pay_per_hour * offer.hours_per_day * offer.num_days
                }`}
              </p>
              <div className="offer-actions">
                <button
                  className="accept-button"
                  onClick={() => acceptOffer(offer.id)}
                >
                  Accept
                </button>
                <button
                  className="reject-button"
                  onClick={() => rejectOffer(offer.id)}
                >
                  Reject
                </button>
              </div>
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

export default ApplicantViewOffers;
