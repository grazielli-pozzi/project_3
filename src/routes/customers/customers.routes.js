import { Router } from 'express';
import createClient from './private/create/routes';

const router = Router();

router.use('/private', createClient);

export default router;
