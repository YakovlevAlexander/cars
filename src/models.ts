import mongoose, { Document, Schema } from 'mongoose';

export interface CarDocument extends Document {
  brand: string;
  name: string;
  year: number;
  price: number;
}

export const CarSchema = new Schema({
  brand: { type: String },
  name: { type: String },
  year: { type: Number },
  price: { type: Number },
});

export const CarModel = mongoose.model<CarDocument>('Car', CarSchema);
