const express = require('express');
const { id } = require("tigerbeetle-node");
const { createClient, CreateAccountError, CreateTransferError } = require("tigerbeetle-node");

// Create a client object that we use as a sort of middleman object to do all the cool shit
const client = createClient({
    cluster_id: 0n,
    replica_addresses: [process.env.TB_ADDRESS || '3000'],
})
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());
console.log("Initialisation completed successfully");
// GET endpoint
app.get('/', (req, res) => {
    res.send('Welcome to my API!');
});

// POST endpoint
app.post('/data', (req, res) => {
    const { name, age } = req.body;
    res.json({
        message: 'Data received successfully!',
        name,
        age
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
