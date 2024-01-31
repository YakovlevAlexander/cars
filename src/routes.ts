import express from 'express';
import { auth, generateToken } from './middleware';
import { getAllCars, getCarById, createCar, updateCar, deleteCar } from './controllers';

const router = express.Router();

router.post('/auth/token', generateToken);
router.use(auth);

router.get('/cars', getAllCars);
router.get('/cars/:id', getCarById);
router.post('/cars', createCar);
router.put('/cars/:id', updateCar);
router.delete('/cars/:id', deleteCar);

export default router;
