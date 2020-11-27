import { Router } from 'express';

import processesService from '../../../services/processes.services';

const router = Router();

router.get('/list', async (req, res, next) => {
    try {
        const processes = await processesService.get();
        console.log('Okay');
        return res.status(200).json(processes);
    } catch (error) {
        console.log(error);

        return next(error);
    }
});

// router.post('/create', (req, res, next) => {

// })

export default router;