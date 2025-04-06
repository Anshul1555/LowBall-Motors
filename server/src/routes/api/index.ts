import { Router } from 'express';
import { carRoutes } from './car-routes.js';
import { userRouter } from './user-routes.js';
import { askRoutes } from './ask-routes.js';

const router = Router();

router.use('/cars', carRoutes);
router.use('/users', userRouter);
router.use('/ask', askRoutes);

export default router;
