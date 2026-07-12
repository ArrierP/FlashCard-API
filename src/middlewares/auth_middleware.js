import jwt from "jsonwebtoken";
import User from "../models/user_model.js";
const authMiddleware = async (req, res, next) => {
    try {
        let token = req.headers.authorization
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }
        if (token && token.startsWith("Bearer "))
            token = req.headers.authorization.split(" ")[1];


        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'User not found.' });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }

}

export default authMiddleware