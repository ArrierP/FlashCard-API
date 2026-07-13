import { getStudyAnlytics } from '../services/analytics_service.js'


export const getStudyAnlyticsController = async (req, res) => {
    try {
        const userId = req.user.id

        const { totalCards, newCards, learningCards, masteredCards } = await getStudyAnlytics(userId)

        res.status(200).json({
            summary: { totalCards, newCards, learningCards, masteredCards }
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
