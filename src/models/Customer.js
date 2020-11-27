import mongoose from 'mongoose';

const { Schema } = mongoose;

const customerSchema = new Schema({
    cpf: { type: Number, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    role: { type: String, enum: ['advogado', 'cliente'], required: true },
    registration_date: { type: Date, required: true },
    processes: [{ type: Schema.Types.ObjectId, ref: 'Process', required: true }],
});


export default mongoose.model('Customer', customerSchema);
