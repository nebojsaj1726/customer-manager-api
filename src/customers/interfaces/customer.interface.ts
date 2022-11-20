import { Document } from 'mongoose';

export interface Customer extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  company: string;
}
