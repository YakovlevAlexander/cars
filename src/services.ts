import omit from 'lodash/omit';
import { CarModel } from './models';
import { Car } from './interfaces';

const fields = {brand: 1, name: 1, year: 1, price: 1};

export async function getAllCars(): Promise<Car[]> {
  try {
    const cars: Car[] = await CarModel.find({}, fields).lean();
    return cars;
  } catch (err) {
    throw new Error('Error fetching cars');
  }
}

export async function getCarById(id: string): Promise<Car | null> {
  try {
    const car: Car | null = await CarModel.findById(id, fields).lean();
    return car;
  } catch (err) {
    throw new Error('Error fetching car');
  }
}

export async function createCar(car: Car): Promise<Car> {
  try {
    const createdCar: Car = (await CarModel.create(car)).toObject();
    return omit(createdCar, '__v');
  } catch (err) {
    throw new Error('Error adding car');
  }
}

export async function updateCar(id: string, car: Partial<Car>): Promise<Car | null> {
  try {
    const updatedCar: Car | null = await CarModel.findByIdAndUpdate(id, car, { new: true }).lean();
    return updatedCar;
  } catch (err) {
    throw new Error('Error updating car');
  }
}

export async function deleteCar(id: string): Promise<void> {
  try {
    await CarModel.findByIdAndDelete(id);
  } catch (err) {
    throw new Error('Error deleting car');
  }
}