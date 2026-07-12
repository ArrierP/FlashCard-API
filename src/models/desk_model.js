import mongoose from 'mongoose';

const DeskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
}, { timestamps: true }); 

const Desk = mongoose.model('Deck', DeskSchema);
export default Desk;