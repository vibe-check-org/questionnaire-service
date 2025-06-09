import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Kategorie } from '../model/entity/kategorie.entity.js';
import { CreateKategorieInput } from '../model/dto/create-kategorie.input.js';

@Injectable()
export class KategorieService {
    readonly #kategorieRepo: Repository<Kategorie>;
    constructor(
        @InjectRepository(Kategorie)
        kategorieRepo: Repository<Kategorie>,
    ) {
        this.#kategorieRepo = kategorieRepo;
    }

    async create(input: CreateKategorieInput): Promise<Kategorie> {
        const kategorie = this.#kategorieRepo.create(input);
        return this.#kategorieRepo.save(kategorie);
    }

    async findAll(): Promise<Kategorie[]> {
        return this.#kategorieRepo.find({ relations: ['fragen'] });
    }
}
