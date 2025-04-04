import { Router } from 'express';
import { carRoutes } from './car-routes.js';
import { userRouter } from './user-routes.js';

const router = Router();

router.use('/cars', carRoutes);
router.use('/users', userRouter);

export default router;
