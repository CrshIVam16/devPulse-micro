const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const issueRoutes = require('./routes/issueRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/devpulse_micro';

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/issues', issueRoutes);

// MongoDB connection
mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('MongoDB connection established');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => {
        console.error('Database connection error:', err.message);
    });