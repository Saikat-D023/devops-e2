const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// -------------------- MIDDLEWARE --------------------
app.use(cors());
app.use(express.json());

// -------------------- ROUTES --------------------

// ✅ Root route (used for quick or Jest testing)
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Server root working fine!' });
});

// ✅ Health check endpoint (critical for Kubernetes)
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// ✅ Sample API endpoint
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

// -------------------- DATABASE CONNECTION --------------------
// Skip MongoDB connection during tests
if (process.env.NODE_ENV !== 'test') {
  if (process.env.MONGO_URI) {
    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => console.log('MongoDB connected'))
      .catch((err) => console.log('MongoDB error:', err));
  } else {
    console.log('⚠️  MONGO_URI not found, skipping MongoDB connection.');
  }
}

// -------------------- START SERVER --------------------
// Prevent listening during Jest tests
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
  });
}

// Export app for testing
module.exports = app;
