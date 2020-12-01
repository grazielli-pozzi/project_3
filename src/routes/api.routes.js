import express from 'express';
import processesRoutes from './processes/processes.routes';
import customersRoutes from './customers/customers.routes';
import authRoutes from './auth/auth.routes';

const router = express.Router();

router.use('/processes', processesRoutes);

router.use('/customers', customersRoutes);

router.use('/auth', authRoutes);

export default router;
