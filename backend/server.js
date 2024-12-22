const express = require('express');
const cors = require('cors');
const { monitoringRoutes, trackRequests, statusMonitorConfig } = require('./monitoring/routes');
const statusMonitor = require('express-status-monitor');
const logger = require('./monitoring/logger');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const backupRoutes = require('./utils/backupScheduler');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(statusMonitor(statusMonitorConfig));
app.use(trackRequests);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000,
    message: { error: 'Too many requests, please try again later' }
});
app.use(limiter);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/backup', backupRoutes);
app.use('/monitoring', monitoringRoutes);

app.use('/api/universities', require('./routes/universities'));
app.use('/api/auth', authRoutes);
connectDB();


app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});
