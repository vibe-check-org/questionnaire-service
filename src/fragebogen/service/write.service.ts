import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Kategorie } from '../model/entity/kategorie.entity.js';
import { CreateKategorieInput } from '../model/dto/create-kategorie.input.js';
import { Fragebogen } from '../model/entity/fragebogen.entity.js';
import { Frage } from '../model/entity/frage.entity.js';
import { CreateFragebogenInput } from '../model/dto/create-fragebogen.input.js';
import { CreateFrageInput } from '../model/dto/create-frage.input.js';
import { UpdateFrageInput } from '../model/dto/update-frage.input.js';
import { UpdateKategorieInput } from '../model/dto/update-kategorie.input.js';
import { UpdateFragebogenInput } from '../model/dto/update-fragebogen.input.js';

@Injectable()
export class WriteService {
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

    async createFragebogen(input: CreateFragebogenInput): Promise<Fragebogen> {
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

    async updateFragebogen(
        id: string,
        input: UpdateFragebogenInput,
    ): Promise<Fragebogen> {
        const fragebogen = await this.#fragebogenRepo.findOneByOrFail({ id });
        Object.assign(fragebogen, input);
        return this.#fragebogenRepo.save(fragebogen);
    }

    async deleteFragebogen(id: string): Promise<boolean> {
        const result = await this.#fragebogenRepo.delete({ id });
        return result.affected !== 0;
    }

    async createFrage(input: CreateFrageInput): Promise<Frage> {
        const frage = this.#frageRepo.create(input);
        return await this.#frageRepo.save(frage);
    }

    async updateFrage(id: string, input: UpdateFrageInput): Promise<Frage> {
        const frage = await this.#frageRepo.findOneByOrFail({ id });
        Object.assign(frage, input);
        return this.#frageRepo.save(frage);
    }

    async deleteFrage(id: string): Promise<boolean> {
        const result = await this.#frageRepo.delete({ id });
        return result.affected !== 0;
    }

    async createKategorie(input: CreateKategorieInput): Promise<Kategorie> {
        const kategorie = this.#kategorieRepo.create(input);
        return this.#kategorieRepo.save(kategorie);
    }

    async updateKategorie(
        id: string,
        input: UpdateKategorieInput,
    ): Promise<Kategorie> {
        const kategorie = await this.#kategorieRepo.findOneByOrFail({ id });
        Object.assign(kategorie, input);
        return this.#kategorieRepo.save(kategorie);
    }

    async deleteKategorie(id: string): Promise<boolean> {
        const result = await this.#kategorieRepo.delete({ id });
        return result.affected !== 0;
    }
}
