import {
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Body,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { CustomerDto, CreateCustomerDto } from 'src/dtos';
import { NotFoundError } from '@mikro-orm/core';

@Controller('customer')
@ApiTags('Customer')
@ApiBearerAuth()
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of all customers retrieved successfully',
    type: CustomerDto,
    isArray: true,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({
    status: 500,
    description: 'Something went wrong!',
  })
  async getAll(): Promise<CustomerDto[]> {
    try {
      const customers = await this.customerService.findAll();
      return customers;
    } catch (e) {
      throw new InternalServerErrorException('Something went wrong!');
    }
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Customer retrieved successfully',
    type: CustomerDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'Customer not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Something went wrong!',
  })
  async findOne(@Param('id') id: string): Promise<CustomerDto> {
    try {
      return await this.customerService.findOne(id);
    } catch (e) {
      console.log(e);
      if (e instanceof NotFoundError) throw new NotFoundException(e.message);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  @Post()
  async create(@Body() data: CreateCustomerDto): Promise<CustomerDto> {
    try {
      return this.customerService.create(data);
    } catch (e) {
      throw new InternalServerErrorException('Something went wrong!');
    }
  }
}
