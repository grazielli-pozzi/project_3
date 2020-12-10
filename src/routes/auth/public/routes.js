import { Router } from 'express';
import ApplicationError from '../../../errors/ApplicationError';
import authService from '../../../services/auth.service';
import UserEntity from '../../../models/User';

const router = Router();

router.post('/login', UserEntity.validateLogin, async (req, res, next) => {
    try {
        const loggedInfo = await authService.login(req.body);
        console.log(loggedInfo);
        return res.status(200).json(loggedInfo);
    } catch (error) {
        return next(new ApplicationError(error));
    }
});

export default router;