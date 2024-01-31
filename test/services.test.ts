import { expect } from 'chai';
import mongoose, { mongo } from 'mongoose';
import * as carService from '../src/services';
import { CarDocument, CarModel } from '../src/models';

const cars = [
  { id: 1, brand: 'Toyota', model: 'Prius', year: 2015, price: 200000000 },
  { id: 2, brand: 'Kia', model: 'Niro', year: 2020, price: 300000000 },
  { id: 3, brand: 'Honda', model: 'Fit', year: 2010, price: 100000000 },
];

describe('Car service', () => {
  before((done) => {
    mongoose.connect('mongodb://localhost:27017/db');
    const db = mongoose.connection;
    db.once('open', () => {
      console.log('Connected to database');
      done();
    });
    db.on('error', (err) => {
      console.error('Error connecting to database');
      done(err);
    })
  });

  after(() => {
    mongoose.connection.close();
  });

  beforeEach(async () => {
    await CarModel.deleteMany({});
  });

  it('should get list of cars', async () => {
    await CarModel.create(cars);
    const allCars = await carService.getAllCars();
    expect(allCars).equals(cars);
  });

  it('should get car by ID', async () => {
    const created = await CarModel.create(cars);
    const car = await carService.getCarById(created[0].id);
    expect(car).equals(cars[0].id);
  });

  it('should create a car', async () => {
    const oneCar = await carService.createCar(cars[0]);
    expect(oneCar).equals(cars[0]);
  });

  it('should update existing car', async () => {
    const oneCar = await carService.createCar(cars[0]);
    const updatedCar = await carService.updateCar(oneCar.id, { model: 'Prius V' });
    expect(updatedCar?.model).equals('Prius V');
  });

  it('should delete car', async () => {
    const created = await CarModel.create(cars);
    await carService.deleteCar(created[0].id);
    const deleted = await carService.getCarById(created[0].id);
    expect(deleted).equals(null);
  });
});
