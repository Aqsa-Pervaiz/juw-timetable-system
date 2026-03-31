/**
 * JUW Timetable Management System - Main Server File
 * Entry point for the backend application
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { testConnection } = require('./config/database');
const logger = require('./config/logger');
const { errorHandler, notFound } = require('./middleware/errorHandler');

// Import routes
const authRoutes = require('./routes/auth');
const timetableRoutes = require('./routes/timetable');
const teacherRoutes = require('./routes/teachers');
const resourceRoutes = require('./routes/resources');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// ===========================
// MIDDLEWARE
// ===========================

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5000',
    credentials: true
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

// ===========================
// ROUTES
// ===========================

// Health check route
app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'JUW Timetable API is running',
        timestamp: new Date().toISOString()
    });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/timetable', timetableRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api', resourceRoutes);

// ===========================
// ERROR HANDLING
// ===========================

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

// ===========================
// START SERVER
// ===========================

const startServer = async () => {
    try {
        // Test database connection
        const dbConnected = await testConnection();
        
        if (!dbConnected) {
            logger.error('Failed to connect to database. Exiting...');
            process.exit(1);
        }

        // Start listening
        app.listen(PORT, () => {

            logger.info(`
┌─────────────────────────────────────────────────┐
│  JUW Timetable Management System API            │
│  Server running on port ${PORT}                     │
│  Environment: ${process.env.NODE_ENV || 'development'}                     │
│  API Version: ${process.env.API_VERSION || 'v1'}                         │
└─────────────────────────────────────────────────┘
            `);
        });
    } catch (error) {
        logger.error('Failed to start server:', error);
        process.exit(1);
    }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    logger.error('Unhandled Promise Rejection:', err);
    process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception:', err);
    process.exit(1);
});

// Start the server
startServer();

module.exports = app;
