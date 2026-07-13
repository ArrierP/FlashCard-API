import { generateFlashCardData } from '../services/ai_service.js'

export const autoCreateCardWithAI = async (req, res) => {
    const { word, deskId } = req.body
    try {
        const aiData = await generateFlashCardData(word)

        res.status(200).json({
            message: "Generate card successfully.",
            card: aiData,
            ...aiData
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

