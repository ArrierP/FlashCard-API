import { getCardByDeskId, createCard, updateCard, deleteCard, getTodayCardsByDeskId, reviewCardSRS } from "../services/card_service.js"


export const getCardByDeskIdController = async (req, res) => {
    try {
        const { id } = req.params
        const card = await getCardByDeskId(id)
        res.status(200).json({
            message: "Get card successfully.",
            card: card
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}


export const createCardController = async (req, res) => {
    try {
        const { id } = req.params
        const userId = req.user.id
        const { word, phonetic, type, meaning, example, exampleMeaning, cardType, context } = req.body
        const card = await createCard(id, userId, word, phonetic, type, meaning, example, exampleMeaning, cardType, context)

        res.status(201).json({
            message: "Created card successfully.",
            card: card
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const updateCardController = async (req, res) => {
    try {
        const { id } = req.params
        const userId = req.user.id
        const { word, phonetic, type, meaning, example, exampleMeaning, cardType, context } = req.body

        const card = await updateCard(id, userId, word, phonetic, type, meaning, example, exampleMeaning, cardType, context)

        res.status(200).json({
            message: "Updated card successfully.",
            card: card
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const deleteCardController = async (req, res) => {
    try {
        const { id } = req.params
        const card = await deleteCard(id)
        res.status(200).json({
            message: "Deleted card successfully.",
            card: card
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const getTodayCardsByDeskIdController = async (req, res) => {
    try {
        const { id } = req.params
        const userId = req.user.id
        const cards = await getTodayCardsByDeskId(id, userId)
        res.status(200).json({
            message: "Get list of card successfully.",
            cards: cards
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const reviewCardSRSController = async (req, res) => {
    try {
        const { id } = req.params
        const userId = req.user.id
        const quality = req.body.quality

        const card = await reviewCardSRS(id, userId, quality)

        res.status(200).json({
            message: "Card reviewed successfully.",
            card: card
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}