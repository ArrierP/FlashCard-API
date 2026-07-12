import { createUser, loginUser, logoutUser, getUserById } from '../services/user_service.js';
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res) => {
    const { email, username, password } = req.body;
    try {
        const newUser = await createUser(email, username, password);
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await loginUser(email, password);
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '3h' })
        res.status(200).json({
            message: 'Login successful',
            user: {
                username: user.username,
                email: user.email
            },
            token: token
        });
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
};

export const logout = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
};

export const getUser = async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await getUserById(userId);
        res.status(200).json({ user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};