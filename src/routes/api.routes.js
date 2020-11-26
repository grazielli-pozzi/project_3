import express from 'express';
import processesRoutes from './processes/processes.routes';
import customersRoutes from './customers/customers.routes';

const router = express.Router();

router.use('/processes', processesRoutes);

router.use('/customers', customersRoutes);

export default router;
