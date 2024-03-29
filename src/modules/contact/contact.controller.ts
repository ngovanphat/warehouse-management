import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { ContactDto, CreateContactDto, UpdateContactDto } from 'src/dtos';

@Controller('contact')
@ApiTags('Contact')
@ApiBearerAuth()
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of contacts retrieved successfully',
    type: ContactDto,
    isArray: true,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Something went wrong!' })
  async findAll(): Promise<ContactDto[]> {
    try {
      const contacts = await this.contactService.findAll();
      return contacts;
    } catch (e) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ContactDto> {
    try {
      return this.contactService.findOne(id);
    } catch (e) {
      if (e instanceof NotFoundException)
        throw new NotFoundException(e.message);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  @Post()
  async create(@Body() data: CreateContactDto): Promise<ContactDto> {
    try {
      return this.contactService.create(data);
    } catch (e) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateContactDto,
  ): Promise<ContactDto> {
    try {
      return this.contactService.update(id, data);
    } catch (e) {
      if (e instanceof NotFoundException)
        throw new NotFoundException(e.message);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    try {
      await this.contactService.remove(id);
    } catch (e) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
