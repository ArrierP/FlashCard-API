import { generateFlashCardData, generateIdiomData } from '../services/ai_service.js'

export const autoCreateCardWithAI = async (req, res) => {
    const { word, deskId, cardType } = req.body
    try {
        let aiData;

        if(cardType === 'idiom') {
            aiData = await generateIdiomData(word)
            aiData.cardType = 'idiom'
        }
        else{
            aiData = await generateFlashCardData(word)
            aiData.cardType = 'vocabulary'
        }
        res.status(200).json({
            message: "Generate card successfully.",
            card: aiData
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}



