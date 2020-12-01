import { Router } from 'express';
import ApplicationError from '../../../errors/ApplicationError';
import authService from '../../../services/auth.service';

const router = Router();

router.post('/signup', async (req, res, next) => {
    try {
        await authService.register(req.body);

        return res.status(201).json(req.body);
    } catch (error) {
        return next(new ApplicationError({ message: 'There is an error' }));
    }
});

export default router;