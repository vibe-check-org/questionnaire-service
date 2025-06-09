import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fragebogen } from '../model/entity/fragebogen.entity.js';
import { Frage } from '../model/entity/frage.entity.js';
import { Kategorie } from '../model/entity/kategorie.entity.js';

@Injectable()
export class ReadService {
    readonly #fragebogenRepo: Repository<Fragebogen>;
    readonly #frageRepo: Repository<Frage>;
    readonly #kategorieRepo: Repository<Kategorie>;

    constructor(
        @InjectRepository(Fragebogen)
        fragebogenRepo: Repository<Fragebogen>,
        @InjectRepository(Frage)
        frageRepo: Repository<Frage>,
        @InjectRepository(Kategorie)
        kategorieRepo: Repository<Kategorie>,
    ) {
        this.#frageRepo = frageRepo;
        this.#fragebogenRepo = fragebogenRepo;
        this.#kategorieRepo = kategorieRepo;
    }

    async getFragebogenByCategory(kategorieId: string): Promise<Fragebogen[]> {
        return await this.#fragebogenRepo
            .createQueryBuilder('fragebogen')
            .leftJoinAndSelect('fragebogen.fragen', 'frage')
            .where('frage.kategorie.id = :kategorieId', { kategorieId })
            .getMany();
    }

    async getFragenByFragebogen(fragebogenId: string): Promise<Frage[]> {
        return await this.#frageRepo.find({
            where: { fragebogen: { id: fragebogenId } },
            relations: ['kategorie'],
        });
    }

    async findAllFrageboegen(): Promise<Fragebogen[]> {
        return await this.#fragebogenRepo.find({ relations: ['fragen'] });
    }

    async findFragebogenById(id: string): Promise<Fragebogen | null> {
        return await this.#fragebogenRepo.findOne({
            where: { id },
            relations: ['fragen'],
        });
    }

    async findAllKategorien(): Promise<Kategorie[]> {
        return await this.#kategorieRepo.find({ relations: ['fragen'] });
    }

    async findKategorieById(id: string): Promise<Kategorie | null> {
        return await this.#kategorieRepo.findOne({
            where: { id },
            relations: ['fragen'],
        });
    }
}
