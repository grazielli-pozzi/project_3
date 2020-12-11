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

    if(decodedToken.role !== 'advogado') {
        throw new ApplicationError({ message: 'Insuficient credentials', type: 'Auth-Token-Role', status: 401 });
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

// router.get('/list', async (req, res, next) => {
//     try {
//         const { id } = req.user;
//         console.log(req.user);
//         const { search } = req.query;

//         const processes = await processesService.get(id, search);

//         return res.status(200).json(processes);
//     } catch (error) {
//         console.log(error);

//         return next(error);
//     }
// });

// router.get('/list/:id', async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const process = await processesService.getOne(id);
//         console.log(process);

//         return res.status(200).json(process);
//     } catch (error) {
//         console.log(error);

//         return next(error);
//     }
// });

// router.put('/update/:id', async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const { body } = req;
//         const mappedBody = ProcessesMapper.updateOne(body);
//         const updatedProcess = await processesService.updateOne(id, mappedBody);

//         return res.status(200).json(updatedProcess);
//     } catch (error) {
//         console.log(error);

//         return next(error);
//     }
// });

// router.delete('/delete/:id', async (req, res, next) => {
// try {
//     const { id } = req.params;
//     await processesService.deleteOne(id);
//     return res.status(200).json({ message: 'Process deleted' });
// } catch (error) {
//     return next(error);
// }
// });

export default router;