import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerSchema } from './schemas/customer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Customer', schema: CustomerSchema }]),
  ],
  providers: [CustomersService],
  controllers: [CustomersController],
})
export class CustomersModule {}
