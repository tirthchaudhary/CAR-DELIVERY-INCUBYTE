const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.route');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Car Dealership API is running' });
});

module.exports = app;
