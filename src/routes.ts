import express from 'express';
import { auth, generateToken } from './middleware';
import { getAllCars, getCarById, createCar, updateCar, deleteCar } from './controllers';

let cars = [
  { id: 1, brand: 'Toyota', model: 'Prius', year: 2015, price: 200000000 },
  { id: 2, brand: 'Kia', model: 'Niro', year: 2020, price: 300000000 },
  { id: 3, brand: 'Honda', model: 'Fit', year: 2010, price: 100000000 },
];

const router = express.Router();

router.post('/auth/token', generateToken);
router.use(auth);

router.get('/cars', getAllCars);
router.get('/cars/:id', getCarById);
router.post('/cars', createCar);
router.put('/cars/:id', updateCar);
router.delete('/cars/:id', deleteCar);

export default router;
