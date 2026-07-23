const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey123';

// Verify JWT token in Authorization header
const authenticateUser = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const token = authHeader.split(' ')[1];
        const decodedToken = jwt.verify(token, JWT_SECRET);

        req.user = decodedToken;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

// Check if authenticated user has Admin role
const authAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access forbidden. Admin role required.' });
    }
    next();
};

module.exports = { authenticateUser, authAdmin };