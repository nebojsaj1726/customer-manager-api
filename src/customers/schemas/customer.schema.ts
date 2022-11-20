import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CustomerDocument = Customer & Document;

@Schema()
export class Customer {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  phone: string;

  @Prop()
  address: string;

  @Prop()
  description: string;

  @Prop()
  company: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
