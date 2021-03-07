import { Schema } from 'mongoose';

export const amountSchema = new Schema({ amount: { type: Number, required: true }, currency: { type: String, required: true } });

export const addressSchema = new Schema({
  _id: { select: false },
  name: { type: String, required: true },
  street: { type: String },
  streetNumber: { type: String },
  city: { type: String },
  postalCode: { type: String },
  country: { type: String, required: true },
  location: { longitude: { type: Number }, latitude: { type: Number } },
});

export const bankDetailSchema = new Schema({
  _id: { select: false },
  bankName: { type: String, required: true },
  IBAN: { type: String },
  SWIFT: { type: String },
  currency: { type: String },
});
