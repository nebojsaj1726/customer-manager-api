import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from './interfaces/customer.interface';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerDocument } from './schemas/customer.schema';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel('Customer')
    private readonly customerModel: Model<CustomerDocument>,
  ) {}

  public async findAll(
    paginationQuery: PaginationQueryDto,
  ): Promise<CustomerDocument[]> {
    const { limit, offset } = paginationQuery;

    return await this.customerModel.find().skip(offset).limit(limit).exec();
  }

  public async findOne(customerId: string): Promise<CustomerDocument> {
    const customer = await this.customerModel.findById(customerId).exec();
    if (!customer) {
      throw new NotFoundException('Customer not found.');
    }
    return customer;
  }

  public async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const { email } = createCustomerDto;
    const existingCustomer = await this.customerModel.findOne({ email }).exec();
    if (existingCustomer) {
      throw new BadRequestException('Customer with this email already exists');
    }
    const newCustomer = await this.customerModel.create(createCustomerDto);
    return newCustomer;
  }

  public async update(
    customerId: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    const existingCustomer = await this.customerModel.findByIdAndUpdate(
      customerId,
      updateCustomerDto,
    );
    if (!existingCustomer) {
      throw new NotFoundException(`Customer not found`);
    }
    return existingCustomer;
  }

  public async remove(customerId: string): Promise<{ message: string }> {
    const deletedCustomer = await this.customerModel.findByIdAndRemove(
      customerId,
    );
    if (!deletedCustomer) {
      throw new NotFoundException(`Customer not found`);
    }
    return { message: 'Customer successfully deleted' };
  }
}
