import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * @desc    Protect routes - Verify JWT and attach user to request
 */
export const protect = async (req, res, next) => {
    let token;

    // 1. Check if token exists in the Authorization header (Bearer token)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header (Format: "Bearer <token>")
            token = req.headers.authorization.split(' ')[1];

            // 2. Verify Token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 3. Attach User to req object (Exclude password for security)
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: "User not found, authorization denied"
                });
            }

            // 4. Move to the next middleware or controller
            next();
        } catch (error) {
            console.error(`Auth Error: ${error.message}`);
            return res.status(401).json({
                success: false,
                message: "Not authorized, token failed",
                error: error.message
            });
        }
    }

    // 5. If no token is found at all
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Not authorized, no token provided"
        });
    }
};