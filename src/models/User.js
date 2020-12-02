import mongoose from 'mongoose';
import joi from 'joi';

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

const userModel = mongoose.model('User', userSchema);

class UserEntity {
    constructor() {
        this.User = userModel;
        this.cpf = joi.number().required();
        this.email = joi.string().email().required();
        this.name = joi.string().min(1).max(30).required();
        this.lastname = joi.string().min(1).max(30).required();
        this.password = joi.string().required();

        this.validateSignup = this.validateSignup.bind(this);
    }

    validateSignup(req, res, next) {
        const signupUserSchema = joi.object({
            cpf: this.cpf,
            email: this.email,
            name: this.name,
            lastname: this.lastname,
            password: this.password
        });

        const joiValidation = signupUserSchema.validate(req.body);

        if(joiValidation.errors) {
            console.log(joiValidation.errors.details);
            return;
        }
        
        return next();
    }
}

export default new UserEntity();
