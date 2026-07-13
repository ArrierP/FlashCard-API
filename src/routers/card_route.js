import { getCardByDeskIdController, createCardController, updateCardController, deleteCardController, getTodayCardsByDeskIdController, reviewCardSRSController } from "../controllers/card_controler.js"
import { autoCreateCardWithAI } from "../controllers/ai_controller.js"
import express from 'express'
import authMiddleware from '../middlewares/auth_middleware.js'
const route = express.Router()


route.get('/desk/:id', getCardByDeskIdController)
route.post('/create/:id', authMiddleware, createCardController)
route.post('/ai-generate', authMiddleware, autoCreateCardWithAI)
route.put('/update/:id', authMiddleware, updateCardController)
route.delete('/delete/:id', authMiddleware, deleteCardController)
route.get('/today/:id', authMiddleware, getTodayCardsByDeskIdController)
route.put('/review/:id', authMiddleware, reviewCardSRSController)


export default route