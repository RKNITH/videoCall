import User from '../models/User.js';

/**
 * @desc    Get all users (except currently logged in user) to start a call
 * @route   GET /api/users
 * @access  Private (Requires JWT)
 */
export const getAllUsers = async (req, res) => {
    try {
        // Find all users but exclude the password field and the current user
        const users = await User.find({ _id: { $ne: req.user._id } })
            .select('-password')
            .sort({ isOnline: -1 }); // Show online users first

        if (!users || users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No users found"
            });
        }

        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching users",
            error: error.message
        });
    }
};

/**
 * @desc    Update Socket ID when user connects
 * @route   PUT /api/users/update-socket
 * @access  Private
 */
export const updateSocketId = async (req, res) => {
    try {
        const { socketId } = req.body;

        if (!socketId) {
            return res.status(400).json({
                success: false,
                message: "Socket ID is required for real-time communication"
            });
        }

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { socketId, isOnline: true },
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Socket ID updated successfully",
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update Socket ID",
            error: error.message
        });
    }
};

/**
 * @desc    Get specific user status (to check if they are available for a call)
 * @route   GET /api/users/:id
 * @access  Private
 */
export const getUserStatus = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('username isOnline socketId');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving user status",
            error: error.message
        });
    }
};