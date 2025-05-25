const express = require('express');
const cors = require('cors');  // Import the cors middleware
const app = express();
const port = process.env.PORT || 4000;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON body data
app.use(express.json());

// Global variable to store posted data
let storedData = null;

// POST endpoint to receive data and store it
app.post('/api/answers', (req, res) => {
  const data = req.body;
  storedData = data;
  res.json({ received: data });
});

// GET endpoint to retrieve the stored data
app.get('/api/answers', (req, res) => {
  res.json({ storedData: storedData });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
