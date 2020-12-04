import { Router } from 'express';
import ApplicationError from '../../../../errors/ApplicationError';
import authService from '../../../../services/auth.service';
import UserEntity from '../../../../models/User';

const router = Router();

router.post('/create', UserEntity.validateSignup, async (req, res, next) => {
    try {
        await authService.register(req.body);

        return res.status(201).json({ message: 'User created' });
    } 
    catch (error) {
        return next(new ApplicationError(error));
    }
});

export default router;