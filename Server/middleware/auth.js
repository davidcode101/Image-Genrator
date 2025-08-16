import jwt from 'jsonwebtoken';

// Middleware to protect routes
const userAuth = async (req, res, next) => {
    const { token } = req.headers; // Get token from request headers

    // If token is missing
    if (!token) {
        return res.json({ success: false, message: 'Not authorized, login again' });
    }

    try {
        // Verify the token using JWT secret
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        // If token is valid and contains a user id
        if (tokenDecode.id) {
            req.userId = tokenDecode.id; // Attach userId to request for later use
            next(); // Allow request to continue
        } else {
            return res.json({ success: false, message: 'Not authorized, login again' });
        }
    } catch (error) {
        // If token verification fails (expired, invalid, etc.)
        res.json({ success: false, message: error.message });
    }
};

export default userAuth;
