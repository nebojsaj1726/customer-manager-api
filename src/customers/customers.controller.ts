import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Query,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { ApiTags } from '@nestjs/swagger';
import { Customer } from './interfaces/customer.interface';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getAllCustomers(
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<Customer[]> {
    return this.customersService.findAll(paginationQuery);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  getCustomer(@Param('id') customerId: string): Promise<Customer | null> {
    return this.customersService.findOne(customerId);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  addCustomer(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<Customer | null> {
    return this.customersService.create(createCustomerDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  updateCustomer(
    @Param('id') customerId: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer | null> {
    return this.customersService.update(customerId, updateCustomerDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  deleteCustomer(@Param('id') customerId: string) {
    return this.customersService.remove(customerId);
  }
}
