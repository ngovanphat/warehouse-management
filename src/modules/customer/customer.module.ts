import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Contact, Customer } from 'src/entities';

@Module({
  imports: [MikroOrmModule.forFeature([Customer, Contact])],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
