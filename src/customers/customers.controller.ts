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
  UseInterceptors,
  CacheInterceptor,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FilterQueryDto } from 'src/common/dto/filter-query.dto';

@ApiTags('customers')
@Controller('customers')
@UseInterceptors(CacheInterceptor)
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getAllCustomers(@Query() paginationQuery: PaginationQueryDto) {
    return this.customersService.findAll(paginationQuery);
  }

  @Get('/search')
  @UseGuards(AuthGuard('jwt'))
  getCustomersByCompany(@Query() filterQuery: FilterQueryDto) {
    return this.customersService.findByCompany(filterQuery);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  getCustomer(@Param('id') customerId: string) {
    return this.customersService.findOne(customerId);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  addCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  updateCustomer(
    @Param('id') customerId: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(customerId, updateCustomerDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  deleteCustomer(@Param('id') customerId: string) {
    return this.customersService.remove(customerId);
  }
}
