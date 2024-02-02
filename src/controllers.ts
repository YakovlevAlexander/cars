import { Request, Response } from 'express';
import * as carServices from './services';
import { Car } from './interfaces';

export async function getAllCars(req: Request, res: Response) {
  try {
    const cars: Car[] = await carServices.getAllCars();
    res.json(cars);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error'});
  }
}

export async function getCarById(req: Request, res: Response) {
  const carId = req.params.id;
  try {
    const car: Car | null = await carServices.getCarById(carId);
    if (car) {
      res.json(car);
    } else {
      res.status(404).json({ error: 'Car not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error'});
  }
}

export async function createCar(req: Request, res: Response) {
  const newCar: Car = req.body;
  try {
    const car = await carServices.createCar(newCar);
    res.json(car);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error'});
  }
}

export async function updateCar(req: Request, res: Response) {
  const carId = req.params.id;
  const newData = req.body;
  try {
    const updatedCar: Car | null= await carServices.updateCar(carId, newData);
    res.json(updatedCar);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error'});
  }
}

export async function deleteCar(req: Request, res: Response) {
  const carId = req.params.id;
  try {
    await carServices.deleteCar(carId);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error'});
  }
}
