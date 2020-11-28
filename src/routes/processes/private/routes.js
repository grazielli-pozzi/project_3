import { Router } from 'express';

import ProcessesMapper from '../../../mapper/processes.mapper';
import processesService from '../../../services/processes.services';

const router = Router();

router.get('/list', async (req, res, next) => {
    try {
        const { search } = req.query;

        // const mappedSearch = search.trim();

        const processes = await processesService.get(search);
        
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