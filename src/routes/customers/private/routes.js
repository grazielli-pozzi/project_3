import { Router } from 'express';
import ApplicationError from '../../../errors/ApplicationError';
import authService from '../../../services/auth.service';
import UserEntity from '../../../models/User';
import authToken from '../../../utils/authTolken.utils';

const router = Router();

router.use((req, res, next) => {
    const token = req.get('Authorization');
    console.log(token);
    console.log('teste');

    if(!token) {
        throw new ApplicationError({ message: 'Missing Credentials', type: 'Auth-Token-Missing', status: 401 });
    }

    const tokenWithoutBearer = token.split(' ')[1];
    
    let decodedToken;

    try {
        decodedToken = authToken.verify(tokenWithoutBearer);
    } catch (error) {
        throw new ApplicationError({ message: 'Token expired', type: 'Auth-Token-Expired', status: 401 });
    }

    req.user = { id: decodedToken.id };

    return next();
});

router.post('/create', UserEntity.validateSignup, async (req, res, next) => {
    try {
        const { id } = req.user;
        await authService.register(req.body, id);

        return res.status(201).json({ message: 'User created' });
    } 
    catch (error) {
        return next(new ApplicationError(error));
    }
});



export default router;