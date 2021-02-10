import { Schema } from 'mongoose';

export const amountSchema = new Schema({ amount: { type: Number, required: true }, currency: { type: String, required: true } });
