// database.js

import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./jobs.db", (err) => {
  if (err) {
    console.error("Error opening database " + err.message);
  } else {
    console.log("Connected to the jobs database.");
  }
});

// Create User table
db.serialize(() => {
  db.run(`
        CREATE TABLE IF NOT EXISTS Users (
            id TEXT PRIMARY KEY,        -- Applicant ID
            phone_number TEXT NOT NULL, -- Phone number
            wallet_address TEXT NOT NULL, -- Wallet address
            name TEXT NOT NULL,         -- User's name
            surname TEXT NOT NULL,      -- User's surname
            role TEXT NOT NULL,         -- User's role
            location TEXT NOT NULL      -- User's location
        )
    `);
});

// Create JobListings table with foreign key to Applicants
db.serialize(() => {
  db.run(`
        CREATE TABLE IF NOT EXISTS JobListingAvailable (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            job_type TEXT  NULL,
            location TEXT  NULL,
            pay_per_hour REAL  NULL,
            applicant_id TEXT,         -- Foreign key reference to Users table (applicants)
            FOREIGN KEY (applicant_id) REFERENCES Users(id) ON DELETE SET NULL
        )
    `);
});

db.serialize(() => {
  db.run(`
          CREATE TABLE IF NOT EXISTS JobListingOffer (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              job_type TEXT  NULL,
              location TEXT  NULL,
              pay_per_hour REAL  NULL,
              address TEXT  NULL,
              start_date TEXT  NULL,
              hours_per_day INTEGER  NULL,
              num_days INTEGER  NULL,
              job_description TEXT  NULL,
              state TEXT  NULL,
              applicant_id TEXT,         -- Foreign key reference to Users table (applicants)
              customer_id TEXT NULL,          -- Foreign key reference to Users table (customers)
              FOREIGN KEY (applicant_id) REFERENCES Users(id) ON DELETE SET NULL,
              FOREIGN KEY (customer_id) REFERENCES Users(id) ON DELETE SET NULL
          )
      `);
});

const deleteAllRecords = () => {
  db.serialize(() => {
    db.run("DELETE FROM JobListingAvailable", (err) => {
      if (err) {
        console.error("Error deleting JobListings:", err.message);
      } else {
        console.log("All records from JobListings deleted");
      }
    });

    db.run("DELETE FROM Users", (err) => {
      if (err) {
        console.error("Error deleting Users:", err.message);
      } else {
        console.log("All records from Users deleted");
      }
    });

    db.run("DELETE FROM JobListingOffer", (err) => {
      if (err) {
        console.error("Error deleting JobListings:", err.message);
      } else {
        console.log("All records from JobListings deleted");
      }
    });

    // Add more DELETE statements for other tables as necessary
  });
};

//deleteAllRecords();

export default db;
