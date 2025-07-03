import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import { Fragebogen } from '../model/entity/fragebogen.entity.js';
import { Frage } from '../model/entity/frage.entity.js';
import { Kategorie } from '../model/entity/kategorie.entity.js';
import lodash from 'lodash';
const { shuffle } = lodash;


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
        const fragen = await this.#frageRepo.find({
            where: { fragebogen: { id: fragebogenId }, typ: Not('FREITEXT'), },
            relations: ['kategorie'],
        });

        // Gruppiere nach Kategorie
        const gruppiert: Record<string, Frage[]> = {};
        for (const frage of fragen) {
            const key = frage.kategorie.id;
            if (!gruppiert[key]) gruppiert[key] = [];
            gruppiert[key].push(frage);
        }

        // Picke 3 zufällige je Kategorie
        const ausgewählteFragen: Frage[] = [];
        for (const fragenListe of Object.values(gruppiert)) {
            const gemischt = shuffle(fragenListe);
            ausgewählteFragen.push(...gemischt.slice(0, 1));
        }

        return ausgewählteFragen;
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

    async findKategorienByFrageIds(ids: string[]): Promise<Kategorie[] | null> {
        const fragen = await this.#frageRepo.find({
            where: { id: In(ids) },
            relations: ['kategorie'],
        });

        console.log('gefundene Fragen:', fragen);

        // Hole alle eindeutigen Kategorie-IDs aus den Fragen
        const kategorieIds = [
            ...new Set(fragen.map((f) => f.kategorie?.id).filter(Boolean)),
        ];

        if (kategorieIds.length === 0) return null;

        return await this.#kategorieRepo.find({
            where: { id: In(kategorieIds) },
            relations: ['fragen'],
        });
    }
      
}
