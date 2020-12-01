import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    cpf: { type: Number, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['advogado', 'cliente'], required: false },
    processes: [{ type: Schema.Types.ObjectId, ref: 'Process', required: false }],
}, {
    timestamps: true,
});


export default mongoose.model('User', userSchema);
