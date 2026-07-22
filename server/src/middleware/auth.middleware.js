const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

// Verify JWT token in Authorization header
const authenticateUser = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split('')[1];

        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const decodedToken = jwt.verify(token, JWT_SECRET);

        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(401).json({ error: "Unauthorized" });
    }
}

// Check if authenticated user has Admin role
const authAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access forbidden. Admin role required.' });
    }
    next();
}

module.exports = { authenticateUser, authAdmin };