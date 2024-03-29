import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { CustomerDto } from 'src/dtos';

@Controller('customer')
@ApiTags('Customer')
@ApiBearerAuth()
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  async getAll(): Promise<CustomerDto[]> {
    try {
      const customers = await this.customerService.findAll();
      return customers;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException('Something went wrong!');
    }
  }
}
