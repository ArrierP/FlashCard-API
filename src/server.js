import 'dotenv/config';
import express from "express";
import connectDB from "./config/db.js";
import { initReminderCron } from "./config/reminder.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routers/user_route.js";
import deskRoutes from './routers/desk_route.js'
import cardRoutes from './routers/card_route.js'
import analyticsRoute from './routers/analytics_route.js'


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}
));
// app.use(cookieParser());
app.use(express.json());

connectDB();
initReminderCron();

app.get("/", (req, res) => {
    res.send("Welcome to the FlashCard API!");
});

app.use('/api/auth', userRoutes);
app.use('/api/desk', deskRoutes)
app.use('/api/card', cardRoutes)
app.use('/api/analytics', analyticsRoute)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
