const express = require('express');
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

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
