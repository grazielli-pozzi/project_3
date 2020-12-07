import mongoose from 'mongoose';
import joi from 'joi';
import ApplicationError from '../errors/ApplicationError';

const { Schema } = mongoose;

const userSchema = new Schema({
    cpf: { type: String, required: true },
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
        this.cpf = joi.string().required();
        this.email = joi.string().email().required();
        this.name = joi.string().min(1).max(30).required();
        this.lastname = joi.string().min(1).max(30).required();
        this.password = joi.string().required();

        this.validateSignup = this.validateSignup.bind(this);
        this.validateLogin = this.validateLogin.bind(this);
    }

    validateSignup(req, res, next) {
        const signupUserSchema = joi.object({
            cpf: this.cpf,
            email: this.email,
            name: this.name,
            lastname: this.lastname,
            password: this.password,
        }).options({ abortEarly: false });

        const joiValidation = signupUserSchema.validate(req.body);

    console.log(joiValidation);

        if(joiValidation.error) {
            console.log(joiValidation.error.details);

            const errorObject = joiValidation.error.details.reduce((acc, error) => {
                acc[error.context.label] = error.message;

                return acc;
            }, {});

            throw new ApplicationError({ message: errorObject, type: 'Auth-Signup-Error', status: 400 });
        }
        
        return next();
    }

    validateLogin(req, res, next) {
        const LoginUserSchema = joi.object({
            cpf: this.cpf,
            password: this.password,
        }).options({ abortEarly: false });

        const joiValidation = LoginUserSchema.validate(req.body);

    console.log(joiValidation);

    if(joiValidation.error) {
        console.log(joiValidation.error.details);

    const errorObject = joiValidation.error.details.reduce((acc, error) => {
            acc[error.context.label] = error.message;

        return acc;
    }, {});

        throw new ApplicationError({ message: errorObject, type: 'Auth-Login-Error', status: 400 });
    
    }

    return next();

}

}

export default new UserEntity();
