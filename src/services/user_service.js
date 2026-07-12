import User from '../models/user_model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const getUserById = async (userId) => {
    try {
        const user = await User.findById(userId);
        return user;
    } catch (error) {
        throw new Error('Error fetching user by ID: ' + error.message);
    }
};

export const createUser = async (email, username, password) => {
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('User with this email already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, username, password: hashedPassword });
        await newUser.save();
        return newUser;
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }
};

export const loginUser = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }
        // Here you would typically compare the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid password');
        }
        return user;
    } catch (error) {
        throw new Error('Error logging in: ' + error.message);
    }
};

export const logoutUser = async (userId) => {

}

