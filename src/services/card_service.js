import Card from '../models/card_model.js'

export const getCardByDeskId = async (deskId) => {
    try {
        const cards = await Card.find({ deskId: deskId })
        if (!cards || cards.length === 0) {
            throw new Error("Cards not found.")
        }

        return cards
    } catch (err) {
        throw new Error("Something wrong occured while getting list of card... Please try again.")
    }
}

export const createCard = async (deskId, userId, word, phonetic, type, meaning, example, exampleMeaning, cardType = 'vocabulary', context = '') => {
    try {
        const existingCard = await Card.findOne({ word, deskId })

        if (existingCard) {
            throw new Error("Card already existing.")
        }

        if (!deskId || !userId || !word || !phonetic || !type || !meaning || !example || !exampleMeaning) {
            throw new Error("All fields required.")
        }

        const newCard = new Card({ deskId, userId, word, phonetic, type, meaning, example, exampleMeaning, cardType, context })

        await newCard.save()

        return newCard
    } catch (err) {
        throw new Error("Something wrong occured while creating card... Please try again.")
    }
}

export const updateCard = async (cardId, userId, word, phonetic, type, meaning, example, exampleMeaning, cardType, context) => {
    try {
        const existingCard = await Card.findById(cardId)

        if (!existingCard) {
            throw new Error("Card not found.")
        }

        if (word) existingCard.word = word;
        if (phonetic) existingCard.phonetic = phonetic;
        if (type) existingCard.type = type;
        if (meaning) existingCard.meaning = meaning;
        if (example) existingCard.example = example;
        if (exampleMeaning) existingCard.exampleMeaning = exampleMeaning;
        if (cardType) existingCard.cardType = cardType;
        if (context !== undefined) existingCard.context = context;

        await existingCard.save()

        return existingCard
    }
    catch (err) {
        throw new Error("Something wrong occured while updating card... Please try again.")
    }
}

export const deleteCard = async (cardId) => {
    try {
        const card = await Card.findByIdAndDelete(cardId)

        if (!card) {
            throw new Error("Card not found.")
        }

        return card
    } catch (error) {
        throw new Error("Something wrong occured while deleting card... Please try again.")
    }
}

export const getTodayCardsByDeskId = async (deskId, userId) => {
    try {
        const today = new Date()

        const reviewCards = await Card.find({
            deskId: deskId,
            userId: userId,
            nextReviewDate: { $lte: today }
        })

        return reviewCards
    }
    catch (err) {
        throw new Error("Something wrong occured while geting today cards... Please try again.")
    }
}


export const reviewCardSRS = async (cardId, userId, quality) => {
    try {
        const card = await Card.findOne({ _id: cardId, userId: userId })

        if (!card) {
            throw new Error("Card not found.")
        }

        if (quality === "forgot") {
            card.repetition = 0
            card.interval = 1
        }
        else if (quality === "remember") {
            card.repetition += 1

            if (card.repetition === 1) card.interval = 1
            else if (card.repetition === 3) card.interval = 3
            else if (card.repetition === 7) card.interval = 7
            else card.interval = card.interval * 2
        }
        else {
            throw new Error("Invalid quality value. Expected 'forgot' or 'remembered'.")
        }

        const nextDate = new Date()
        nextDate.setDate(nextDate.getDate() + card.interval)
        card.nextReviewDate = nextDate

        await card.save()

        return card
    }
    catch (err) {
        throw new Error("Something wrong occured while updating progress... Please try again.")
    }
}