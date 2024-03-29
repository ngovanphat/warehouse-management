import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Contact } from 'src/entities';

@Module({
  imports: [MikroOrmModule.forFeature([Contact])],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
