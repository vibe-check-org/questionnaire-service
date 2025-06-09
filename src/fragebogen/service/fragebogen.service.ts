import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fragebogen } from '../model/entity/fragebogen.entity.js';
import { Frage } from '../model/entity/frage.entity.js';
import { Kategorie } from '../model/entity/kategorie.entity.js';
import { CreateFragebogenInput } from '../model/dto/create-fragebogen.input.js';

@Injectable()
export class FragebogenService {
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

    async create(input: CreateFragebogenInput): Promise<Fragebogen> {
        const fragen: Frage[] = [];

        for (const frageInput of input.fragen) {
            const kategorie = await this.#kategorieRepo.findOneByOrFail({
                id: frageInput.kategorieId,
            });

            const frage = this.#frageRepo.create({
                text: frageInput.text,
                typ: frageInput.typ,
                kategorie,
            });

            fragen.push(frage);
        }

        const fragebogen = this.#fragebogenRepo.create({
            titel: input.titel,
            aktiv: input.aktiv,
            fragen,
        });

        return this.#fragebogenRepo.save(fragebogen);
    }

    async findAll(): Promise<Fragebogen[]> {
        return this.#fragebogenRepo.find({
            relations: ['fragen', 'fragen.kategorie'],
        });
    }
}
