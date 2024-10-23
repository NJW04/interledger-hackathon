# Bridging domestic work with open payments

This project aims to enable domestic job listings using Open Payments by providing a market place for potential employers and employees to match. The employer pays straight to the employees account after the day is done, helping low income individuals have a steadier source of income as they can get paid straight after the work day. This can allow them to buy food, transport or anything they need more frequently alleviating constant stress if they run out of money.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (Node package manager, installed with Node.js)
- [SQLite3](https://www.sqlite.org/index.html) (for database management)

```bash
git clone git@github.com:NJW04/interledger-hackathon.git
cd interledger-hackathon
```

### Install Backend Dependencies

```bash
cd backend
npm install
```

### Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### Running The Frontend

```bash
npm start
```

### Running The Backend

```bash
cd ../backend
node database.js
node index.js
```

### Configuration

Ensure the frontend is set to communicate with the backend. Update the package.json file to include the proxy configuration for the Nodejs backend:

```bash
   "proxy": "http://localhost:5000"
```
