import Card from '../models/card_model.js'
import User from '../models/card_model.js'

export const getStudyAnlytics = async (userId) => {
    try {
        if (!User.findById(userId)) {
            throw new Error("User not found")
        }
        const totalCards = await Card.countDocuments({ userId })
        const newCards = await Card.countDocuments({ userId, repetition: 0 })
        const learningCards = await Card.countDocuments({ userId, repetition: { $gt: 0 }, interval: { $lt: 7 } })
        const masteredCards = await Card.countDocuments({ userId, repetition: { $gte: 7 } })

        return { totalCards, newCards, learningCards, masteredCards }
    } catch (err) {
        throw new Error(`Something wrong occured while getting study analytics... Please try again.`)
    }
}