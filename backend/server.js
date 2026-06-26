const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const allowedOrigins = [
  'https://budgetingtask.netlify.app', // Production link (NO trailing slash)
  'http://localhost:5173',             // Your local development server 
];

const app = express();
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, or postman)
    if (!origin) return callback(null, true);
    
    // Check if the origin matches our list or is a Netlify preview subdomain
    if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.netlify.app')) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/transactions', require('./routes/transactionRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server is running on port http://localhost:' + PORT));