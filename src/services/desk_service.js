import Desk from '../models/desk_model.js';

export const createDesk = async (title, description) => {
    try {
        if (!title) {
            throw new Error('Title is required');
        }
        if (description && description.length > 500) {
            throw new Error('Description cannot exceed 500 characters');
        }

        const existingDesk = await Desk.findOne({ title });
        if (existingDesk) {
            throw new Error('A desk with this title already exists');
        }

        const newDesk = new Desk({ title, description });
        await newDesk.save();
        return newDesk;
    }
    catch (err) {
        throw new Error(`Failed to create desk: ${err.message}`);
    }
};

export const getAllDesks = async () => {
    try {
        const desks = await Desk.find();
        return desks;
    }
    catch (err) {
        throw new Error(`Failed to retrieve desks: ${err.message}`);
    }
};

export const updateDesk = async (deskId, title, description) => {
    try {
        const desk = await Desk.findById(deskId);
        if (!desk) {
            throw new Error('Desk not found');
        }

        if (title) desk.title = title
        if (description) desk.description = description

        await desk.save()

        return desk
    }
    catch (err) {
        throw new Error("Something wrong occured while updating... Please check again.")
    }
};

export const deleteDesk = async (deskId) => {
    try {
        const desk = await Desk.findByIdAndDelete(deskId)

        if (!desk) {
            throw new Error("Desk not found.")
        }

        return desk
    } catch (err) {
        throw new Error("Something wrong occured while deleting... Please try again.")
    }
}

