import {
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { CustomerDto, CreateCustomerDto, UpdateCustomerDto } from 'src/dtos';
import { NotFoundError } from '@mikro-orm/core';

@Controller('customer')
@ApiTags('Customer')
@ApiBearerAuth()
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all customers',
  })
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
  @ApiOperation({
    summary: 'Get a customer by ID',
  })
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
  @ApiOperation({
    summary: 'Create a customer',
  })
  @ApiResponse({
    status: 201,
    description: 'Customer created successfully',
    type: CustomerDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 409, description: 'Customer is already existed' })
  @ApiResponse({ status: 500, description: 'Something went wrong' })
  async create(@Body() data: CreateCustomerDto): Promise<CustomerDto> {
    try {
      return this.customerService.create(data);
    } catch (e) {
      throw new InternalServerErrorException('Something went wrong!');
    }
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update customer by ID',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'Customer not found!',
  })
  @ApiResponse({
    status: 500,
    description: 'Somthing went wrong',
  })
  async update(
    @Param('id') id: string,
    @Body() data: UpdateCustomerDto,
  ): Promise<CustomerDto> {
    try {
      return this.customerService.update(id, data);
    } catch (e) {
      if (e instanceof NotFoundError) throw new NotFoundException(e.message);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    try {
      await this.customerService.remove(id);
    } catch (e) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
