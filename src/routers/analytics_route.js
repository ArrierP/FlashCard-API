import { getStudyAnlyticsController } from '../controllers/analytics_controller.js'
import express from 'express'
import authMiddleware from '../middlewares/auth_middleware.js'


const route = express.Router()


route.get('/', authMiddleware, getStudyAnlyticsController)

export default route