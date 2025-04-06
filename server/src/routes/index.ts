import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import {askRoutes} from './api/ask-routes.js';


const router = Router();

router.use('/auth', authRoutes);
// TODO: Add authentication to the API routes
router.use('/api', apiRoutes);
router.use('/ask', askRoutes);

export default router;
