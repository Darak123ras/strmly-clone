require('dotenv').config(); 
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');
const limiter = require('./middleware/rateLimiter');
const connectDB = require('./config/db');

// Route files
const authRoutes = require('./routes/authRoutes');
const videoRoutes = require('./routes/videoRoutes');

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// security headers
app.use(helmet());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Rate limiting
app.use(limiter);

app.get('/', (req, res) => {
  res.send('STRMLY Backend API is running');
});

// Mount routers
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/videos', videoRoutes);


// Error handler
app.use(errorHandler);

module.exports = app;
