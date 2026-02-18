import express from 'express';
import {
    getAllUsers,
    updateSocketId,
    getUserStatus
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * All routes below this point require a valid JWT token
 */
router.use(protect);

// @route   GET /api/users
// Get list of users to call
router.get('/', getAllUsers);

// @route   PUT /api/users/update-socket
// Update the user's current socket ID upon connection
router.put('/update-socket', updateSocketId);

// @route   GET /api/users/:id
// Check if a specific user is online/available
router.get('/:id', getUserStatus);

export default router;