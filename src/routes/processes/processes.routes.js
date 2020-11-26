import { Router } from 'express';
import processesPrivateRoutes from './private/routes';

const router = Router();

router.use('/private', processesPrivateRoutes);

export default router;
