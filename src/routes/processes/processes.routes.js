import { Router } from 'express';
import processesPrivateRoutesAdv from './processes-adv/private/routes';
import processesPrivateRoutesClient from './processes-client/private/routes';

const router = Router();

router.use('/processes-adv/private', processesPrivateRoutesAdv);
router.use('/processes-client/private', processesPrivateRoutesClient);

export default router;
