import { Router } from 'express';

const router = Router();

router.get('/list', (req, res, next) => {
    try {
        return res.status(200).json([{ tittle: 'Processo 1', description: 'Processo 1' }]);
    } catch (error) {
        console.log(error);

        return next(error);
    }
});

export default router;