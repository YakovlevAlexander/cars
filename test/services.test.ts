import mongoose from 'mongoose';
import omit from 'lodash/omit';
import * as carService from '../src/services';
import { CarDocument, CarModel } from '../src/models';
import { Car } from '../src/interfaces';

const cars: Car[] = [
  { brand: 'Toyota', name: 'Prius', year: 2015, price: 200000000 },
  { brand: 'Kia', name: 'Niro', year: 2020, price: 300000000 },
  { brand: 'Honda', name: 'Fit', year: 2010, price: 100000000 },
];

describe('Car service', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/db');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await CarModel.deleteMany({});
  });

  it('should get list of cars', async () => {
    await CarModel.create(cars);
    const allCars: Car[] = await carService.getAllCars();
    expect(allCars).toHaveLength(cars.length);
    expect(cars[0]).toStrictEqual(omit(allCars[0], '_id'));
  });

  it('should get car by ID', async () => {
    const created: CarDocument[] = await CarModel.create(cars);
    const car: Car | null = await carService.getCarById(created[0]._id);
    expect(car).toBeDefined();
    expect(cars[0]).toStrictEqual(omit(car, '_id'));
  });

  it('should create a car', async () => {
    const car: Car = await carService.createCar(cars[0]);
    expect(cars[0]).toStrictEqual(omit(car, '_id'));
  });

  it('should update existing car', async () => {
    const car: Car = await carService.createCar(cars[0]);
    const updatedCar = await carService.updateCar(car._id!, { name: 'Prius V' });
    expect(updatedCar?.name).toEqual('Prius V');
  });

  it('should delete car', async () => {
    const car: Car = await carService.createCar(cars[0]);
    await carService.deleteCar(car._id!);
    const deleted = await carService.getCarById(car._id!);
    expect(deleted).toBeNull();
  });
});
