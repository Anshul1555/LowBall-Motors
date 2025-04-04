import { Router } from 'express';
import { getAllCars, getCarById, createCar, updateCar, deleteCar } from '../../controllers/cars-controller.js';

const router = Router();

router.get('/', getAllCars);      
router.get('/:id', getCarById);   
router.post('/', createCar);      
router.put('/:id', updateCar);    
router.delete('/:id', deleteCar); 

export { router as carRoutes };
