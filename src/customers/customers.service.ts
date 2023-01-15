import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerDocument } from './schemas/customer.schema';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { FilterQueryDto } from 'src/common/dto/filter-query.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel('Customer')
    private readonly customerModel: Model<CustomerDocument>,
  ) {}

  async findAll(paginationQuery: PaginationQueryDto) {
    const { page, limit } = paginationQuery;
    const data = await this.customerModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    const total = await this.customerModel.count();

    return { data, total };
  }

  async findByCompany(filterQuery: FilterQueryDto) {
    const { company } = filterQuery;
    return this.customerModel.find({
      company: { $regex: company, $options: 'i' },
    });
  }

  async findOne(customerId: string) {
    const customer = await this.customerModel.findById(customerId).exec();
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    return customer;
  }

  async create(createCustomerDto: CreateCustomerDto) {
    const { email } = createCustomerDto;
    const existingCustomer = await this.customerModel.findOne({ email }).exec();
    if (existingCustomer) {
      throw new BadRequestException('Customer with this email already exists');
    }
    const newCustomer = await this.customerModel.create(createCustomerDto);
    return newCustomer;
  }

  async update(customerId: string, updateCustomerDto: UpdateCustomerDto) {
    const existingCustomer = await this.customerModel.findByIdAndUpdate(
      customerId,
      updateCustomerDto,
    );
    if (!existingCustomer) {
      throw new NotFoundException(`Customer not found`);
    }
    return existingCustomer;
  }

  async remove(customerId: string) {
    const deletedCustomer = await this.customerModel.findByIdAndRemove(
      customerId,
    );
    if (!deletedCustomer) {
      throw new NotFoundException(`Customer not found`);
    }
    return { message: 'Customer successfully deleted' };
  }
}
