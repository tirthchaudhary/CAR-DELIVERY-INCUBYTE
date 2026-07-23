const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.route');
const vehicleRoutes = require('./routes/vehicle.route');

const app = express();

app.use(cors());
app.use(express.json());

// Root health check endpoint
app.get('/', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Car Dealership API is running live' });
});

// Auth Routes
app.use('/api/auth', authRoutes);

// Vehicle Routes
app.use('/api/vehicles', vehicleRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Car Dealership API is running' });
});

module.exports = app;
