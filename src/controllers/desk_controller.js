import { createDesk, getAllDesks, updateDesk, deleteDesk } from "../services/desk_service.js"


export const createDeskController = async (req, res) => {
    try {
        const { title, description } = req.body

        const desk = await createDesk(title, description)

        res.status(201).json({
            message: "Create desk successfully.",
            desk: desk
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const getAllController = async (req, res) => {
    try {
        const desks = await getAllDesks()

        res.status(200).json({
            message: "Get all desks successfully.",
            desks: desks
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const updateDeskController = async (req, res) => {
    try {
        const { id } = req.params
        const { title, description } = req.body

        const desk = await updateDesk(id, title, description)

        res.status(200).json({
            message: "Updated desk successfully.",
            desk: desk
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}


export const deleteDeskController = async (req, res) => {
    try {
        const { id } = req.params
        const desk = await deleteDesk(id)
        res.status(200).json({
            message: "Deleted desk successfully.",
            desk: desk
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}