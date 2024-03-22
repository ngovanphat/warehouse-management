// src/genres/genres.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Genres } from 'src/entities';
import { EntityRepository } from '@mikro-orm/core';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genres)
    private readonly genresRepository: EntityRepository<Genres>,
  ) {}

  async findAll(): Promise<Genres[]> {
    return this.genresRepository.findAll();
  }

  async findOne(id: string): Promise<Genres> {
    return this.genresRepository.findOne(id);
  }

  async create(data: Partial<Genres>): Promise<Genres> {
    const genres = new Genres(data.name);
    await this.genresRepository.insert(genres);
    return genres;
  }

  async update(id: string, data: Partial<Genres>): Promise<boolean> {
    const isUpdate = await this.genresRepository.nativeUpdate({ id }, data);
    return !!isUpdate;
  }

  async remove(id: string): Promise<number> {
    return this.genresRepository.nativeDelete(id);
  }
}
