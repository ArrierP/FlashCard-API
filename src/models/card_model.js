import mongoose from "mongoose";


const cardSchema = mongoose.Schema(
    {
        deskId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Deck",
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        word: {
            type: String,
            required: true,
            trim: true
        },
        phonetic: {
            type: String,
            required: true,
            trim: true
        },
        type: {
            type: String,
            required: true,
            trim: true
        },
        meaning: {
            type: String,
            required: true,
            trim: true
        },
        example: {
            type: String,
            required: true,
            trim: true
        },
        exampleMeaning: {
            type: String,
            required: true,
            trim: true
        },
        interval: {
            type: Number,
            default: 0
        },
        repetition: {
            type: Number,
            default: 0
        },
        efactor: {
            type: Number,
            default: 2.5
        },
        nextReviewDate: {
            type: Date,
            default: Date.now
        }
    }, { timestamps: true }
);

const Card = mongoose.model("Card", cardSchema);
export default Card;