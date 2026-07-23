const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const register = async (req, res) => {
    try {
        const { name, email, passowrd, role } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hasshedPassword = await bcrypt.hash(passowrd, 10);

        const user = await User.create({
            name,
            email,
            passowrd: hasshedPassword,
            role: role || 'user',
        });

        res.status(201).json({
            message: 'User registered successfully',
            user,
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, passowrd } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(passowrd, user.passowrd);

        if (isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, email: user.email, role: role }, JWT_SECRET, { expiresIn: '24h' });

        res.status(200).json({
            token,
            user,
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { register, login };