import mongoose from 'mongoose';

const { Schema } = mongoose;

const processSchema = new Schema({
    process_number: { type: Number, required: true },
    description: { type: String, required: true },
    complainer: { type: String, required: true },
    claimed: { type: String, required: true },
    lawyer: [{ type: Schema.Types.ObjectId, ref: 'Customer', required: false }],
    status: { type: String, required: true, enum: ['pendente de manifestação', 'concluso', 'prazo', 'aguardando audiência'] },
    creation_date: { type: Date, required: false },
    customer: [{ type: Schema.Types.ObjectId, ref: 'Customer', required: false }],
});


export default mongoose.model('Process', processSchema);
