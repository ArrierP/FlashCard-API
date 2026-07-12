import { createDeskController, getAllController, updateDeskController, deleteDeskController } from "../controllers/desk_controller.js"
import express from "express"
import authMiddleware from "../middlewares/auth_middleware.js"
const route = express.Router()

route.get('/', authMiddleware, getAllController)
route.post('/create', authMiddleware, createDeskController)
route.put('/update/:id', authMiddleware, updateDeskController)
route.delete('/delete/:id', authMiddleware, deleteDeskController)

export default route



