import { Router } from 'express';
import ApplicationError from '../../../errors/ApplicationError';
import authService from '../../../services/auth.service';
import UserEntity from '../../../models/User';

const router = Router();

// const validateBodyRequest = (req, res, next) => {
//     if(!req.body.cpf || !req.body.email || !req.body.name || !req.body.lastname 
//         || !req.body.password) {
//             throw new ApplicationError({ message: 'Campo obrigatório', status: 400 });
//         }
//         next();
// };

router.post('/signup', UserEntity.validateSignup, async (req, res, next) => {
    try {
        await authService.register(req.body);

        return res.status(201).json({ message: 'User created' });
    } 
    catch (error) {
        return next(new ApplicationError({ message: 'There is an error' }));
    }
});

export default router;