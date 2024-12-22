const express = require('express');
const router = express.Router();
const logger = require('./logger');
const promClient = require('prom-client');
const statusMonitor = require('express-status-monitor');

// إعداد Prometheus metrics
const metrics = {
    requestsTotal: new promClient.Counter({
        name: 'http_requests_total',
        help: 'Total number of HTTP requests',
        labelNames: ['method', 'route', 'status']
    }),
    responseTime: new promClient.Histogram({
        name: 'http_response_time_seconds',
        help: 'Response time in seconds',
        labelNames: ['method', 'route']
    }),
    universitiesMetrics: {
        requests: new promClient.Counter({
            name: 'universities_requests_total',
            help: 'Total requests to universities endpoint'
        }),
        activeQueries: new promClient.Gauge({
            name: 'universities_active_queries',
            help: 'Current active university queries'
        })
    }
};

// إعدادات Status Monitor
const statusMonitorConfig = {
    title: 'System Dashboard',
    path: '/system-dashboard',
    spans: [
        { interval: 1, retention: 60 },
        { interval: 5, retention: 60 },
        { interval: 15, retention: 60 }
    ],
    healthChecks: [{
        protocol: 'http',
        host: 'localhost',
        path: '/api/universities',
        port: process.env.PORT
    }],
    ignoreStartsWith: '/api/universities'
};

// Middleware لتتبع الطلبات
const trackRequests = (req, res, next) => {
    const start = Date.now();
    
    if (req.path.startsWith('/api/universities')) {
        metrics.universitiesMetrics.activeQueries.inc();
    }

    res.on('finish', () => {
        const duration = (Date.now() - start) / 1000;
        
        metrics.requestsTotal.inc({
            method: req.method,
            route: req.path,
            status: res.statusCode
        });

        metrics.responseTime.observe({
            method: req.method,
            route: req.path
        }, duration);

        if (req.path.startsWith('/api/universities')) {
            metrics.universitiesMetrics.activeQueries.dec();
        }

        logger.info({
            timestamp: new Date().toISOString(),
            method: req.method,
            path: req.path,
            query: req.query,
            status: res.statusCode,
            duration: `${duration}s`,
            ip: req.ip
        });
    });
    next();
};

// نقاط النهاية للمراقبة
router.get('/metrics', async (req, res) => {
    try {
        res.set('Content-Type', promClient.register.contentType);
        res.end(await promClient.register.metrics());
    } catch (error) {
        logger.error('Error generating metrics:', error);
        res.status(500).end();
    }
});

router.get('/status', (req, res) => {
    const status = {
        uptime: `${Math.floor(process.uptime())} seconds`,
        memory: {
            total: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)} MB`,
            used: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`,
            free: `${Math.round((process.memoryUsage().heapTotal - process.memoryUsage().heapUsed) / 1024 / 1024)} MB`
        },
        requests: {
            total: metrics.requestsTotal.get(),
            universities: metrics.universitiesMetrics.requests.get()
        },
        timestamp: new Date().toISOString()
    };
    res.json(status);
});

module.exports = {
    monitoringRoutes: router,
    trackRequests,
    statusMonitorConfig
}; 