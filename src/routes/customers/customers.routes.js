import { Router } from 'express';
import createClient from './private/routes';

const router = Router();

router.use('/private', createClient);

export default router;
