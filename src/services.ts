import { CarDocument, CarModel } from './models';
import { Car } from './interfaces';

export async function getAllCars(): Promise<CarDocument[]> {
  try {
    const cars = await CarModel.find();
    return cars;
  } catch (err) {
    throw new Error('Error fetching cars');
  }
}

export async function getCarById(id: string): Promise<CarDocument | null> {
  try {
    const car = await CarModel.findById(id);
    return car;
  } catch (err) {
    throw new Error('Error fetching car');
  }
}

export async function createCar(car: Car): Promise<CarDocument> {
  try {
    const createdCar = await CarModel.create(car);
    return createdCar;
  } catch (err) {
    throw new Error('Error adding car');
  }
}

export async function updateCar(id: string, car: Partial<Car>): Promise<CarDocument | null> {
  try {
    const updatedCar = await CarModel.findByIdAndUpdate(id, car, { new: true });
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