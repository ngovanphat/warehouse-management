import {
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { CustomerDto } from 'src/dtos';

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
      console.log(e);
      throw new InternalServerErrorException('Something went wrong!');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CustomerDto> {
    try {
      return await this.customerService.findOne(id);
    } catch (e) {
      if (e instanceof NotFoundException)
        throw new NotFoundException(e.message);
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
