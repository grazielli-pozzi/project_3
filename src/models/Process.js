import mongoose from 'mongoose';

const { Schema } = mongoose;

const processSchema = new Schema({
    process_number: { type: Number, required: false },
    description: { type: String, required: true },
    complainer: { type: String, required: true },
    claimed: { type: String, required: true },
    status: { type: String, required: true, enum: ['pendente de manifestação', 'concluso', 'prazo', 'aguardando audiência'] },
    customer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    lawyer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { 
    timestamps: true 
});


export default mongoose.model('Process', processSchema);
