import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

// Import our custom modules
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import socketHandler from './socket/socketHandler.js';

// 1. Initialize Configuration
dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// 2. Middlewares
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT"],
    credentials: true
}));
app.use(express.json()); // Essential for parsing req.body

// 3. HTTP API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Root Route for Health Check
app.get('/', (req, res) => {
    res.status(200).json({ message: "Video Call API is running..." });
});

// 4. Create HTTP Server for Socket.io
// We need the raw 'http' server to wrap Socket.io around it
const server = http.createServer(app);

// 5. Initialize Socket.io
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

// 6. Pass the 'io' instance to our socket handler
socketHandler(io);

// 7. Start the Server
server.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}`);
});

// Global Error Handler for uncaught exceptions
process.on('unhandledRejection', (err) => {
    console.error(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});