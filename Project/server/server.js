const cluster = require('cluster');
const os = require('os');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const templateRoutes = require('./routes/templateRoutes');
const profileRoutes = require('./routes/profileRoutes');
const adminRoutes = require('./routes/adminRoutes');

dotenv.config();

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    // Fork workers.
    // For development (and to avoid too many connections on local), limit to 2 or numCPUs
    const workers = Math.min(numCPUs, 2);
    for (let i = 0; i < workers; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        cluster.fork();
    });
} else {
    // Worker code
    const app = express();
    const server = http.createServer(app);
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    // Connect to DB (each worker connects)
    connectDB();

    app.use(cors());
    app.use(express.json());

    // Request Logger
    app.use((req, res, next) => {
        console.log(`${req.method} ${req.url}`);
        next();
    });

    // Routes
    app.use('/api/auth', authRoutes);
    app.use('/api/resumes', resumeRoutes);
    app.use('/api/templates', templateRoutes);
    app.use('/api/profile', profileRoutes);
    app.use('/api/admin', adminRoutes);

    // Basic Route
    app.get('/', (req, res) => {
        res.send(`Resume Builder API Running on Worker ${process.pid}`);
    });

    // Socket.io Logic
    io.on('connection', (socket) => {
        console.log(`User connected to worker ${process.pid}`);

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });

    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
        console.log(`Worker ${process.pid} started on port ${PORT}`);
    }).on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`Worker ${process.pid} failed to bind port ${PORT}: Address in use.`);
            // Optional: process.exit(1) or let the master restart it (but master will restart it forever if port is stuck)
        } else {
            console.error(err);
        }
    });
}
