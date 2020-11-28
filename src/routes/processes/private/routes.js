import { Router } from 'express';

import processesService from '../../../services/processes.services';

const router = Router();

router.get('/list', async (req, res, next) => {
    try {
        const processes = await processesService.get();
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
        const processBody = req.body;
        await processesService.create(processBody);

        return res.status(201).json({ message: 'Process created!' });

    } catch (error) {
        
    }
});

router.put('/update/:id', async (req, res, next) => {
    try {
        const { body } = req;
        
        const process = await processesService.getOne(id);
        console.log(process);

        return res.status(200).json(process);
    } catch (error) {
        console.log(error);

        return next(error);
    }
});

export default router;