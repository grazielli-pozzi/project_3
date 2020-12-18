import { Router } from 'express';

import ProcessesMapper from '../../../../mapper/processes.mapper';
import processesService from '../../../../services/processes.services';
import authToken from '../../../../utils/authTolken.utils';
import ApplicationError from '../../../../errors/ApplicationError';

const router = Router();

router.use((req, res, next) => {
    const token = req.get('Authorization');
    console.log(token);

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
        throw new ApplicationError({ message: 'Insufficient credentials', type: 'Auth-Token-Role', status: 401 });
    }

    req.user = { id: decodedToken.id };

    return next();
});

router.get('/list', async (req, res, next) => {
    try {
        const { id } = req.user;
        console.log(req.user);
        const { search } = req.query;

        const processes = await processesService.get(id, search);
        console.log(processes);

        return res.status(200).json(processes);
    } catch (error) {
        console.log(error);

        return next(error);
    }
});

router.get('/list/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const process = await processesService.getOne(id);
        console.log(process);

        return res.status(200).json(process);
    } catch (error) {
        console.log(error);

        return next(error);
    }
});

router.post('/create', async (req, res, next) => {
    try {
        const { id } = req.user;
        const processBody = req.body;
        console.log(processBody);
        await processesService.create(processBody, id);

        return res.status(201).json({ message: 'Process created!' });

    } catch (error) {
        console.log(error);
    }
});

router.put('/update/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { body } = req;
        const mappedBody = ProcessesMapper.updateOne(body);
        const updatedProcess = await processesService.updateOne(id, mappedBody);

        return res.status(200).json(updatedProcess);
    } catch (error) {
        console.log(error);

        return next(error);
    }
});

router.delete('/delete/:id', async (req, res, next) => {
try {
    const { id } = req.params;
    await processesService.deleteOne(id);
    return res.status(200).json({ message: 'Process deleted' });
} catch (error) {
    return next(error);
}
});

export default router;