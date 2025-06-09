import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { CreateKategorieInput } from '../model/dto/create-kategorie.input.js';
import { KategorieService } from '../service/kategorie.service.js';
import { Kategorie } from '../model/entity/kategorie.entity.js';

@Resolver(() => Kategorie)
export class KategorieResolver {
    readonly #kategorieService: KategorieService;

    constructor(kategorieService: KategorieService) {
        this.#kategorieService = kategorieService;
    }

    @Mutation(() => Kategorie)
    createKategorie(@Args('input') input: CreateKategorieInput) {
        return this.#kategorieService.create(input);
    }

    @Query(() => [Kategorie])
    findeAlleKategorien() {
        return this.#kategorieService.findAll();
    }
}
