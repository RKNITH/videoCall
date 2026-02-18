import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

// Import custom modules
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import socketHandler from './socket/socketHandler.js';

// 1. Initialize Configuration
dotenv.config();
connectDB();

const app = express();

// Use Render's dynamic port or 5000 for local dev
const PORT = process.env.PORT || 5000;

// 2. Middlewares
// Important: Ensure FRONTEND_URL in Render matches your Vercel URL (e.g., https://your-app.vercel.app)
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT"],
    credentials: true
}));
app.use(express.json());

// 3. HTTP API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Health Check (Crucial for Render's zero-downtime deploys)
app.get('/', (req, res) => {
    res.status(200).json({
        status: "active",
        message: "Video Call API is running...",
        timestamp: new Date()
    });
});

// 4. Create HTTP Server for Socket.io
const server = http.createServer(app);

// 5. Initialize Socket.io
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        methods: ["GET", "POST"]
    },
    // Adding stability for serverless/hosted environments
    transports: ['websocket', 'polling']
});

// 6. Pass the 'io' instance to socket handler
socketHandler(io);

// 7. Start the Server
// Note: We use 0.0.0.0 to ensure Render can bind to the host correctly
server.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server listening on port ${PORT}`);
});

// Global Error Handler
process.on('unhandledRejection', (err) => {
    console.error(`Error: ${err.message}`);

});