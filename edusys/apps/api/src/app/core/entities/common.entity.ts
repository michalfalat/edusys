import { Schema } from 'mongoose';

export const amountSchema = new Schema({ amount: { type: Number, required: true }, currency: { type: String, required: true } });

export const addressSchema = new Schema({
  name: { type: String, required: true },
  street: { type: String },
  streetNumber: { type: String },
  city: { type: String },
  postalCode: { type: String },
  country: { type: String, required: true },
  location: { longitude: { type: Number }, latitude: { type: Number } },
});
