import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { CreateKategorieInput } from '../model/dto/create-kategorie.input.js';
import { KategorieService } from '../service/kategorie.service.js';
import { Kategorie } from '../model/entity/kategorie.entity.js';
import { Roles } from 'nest-keycloak-connect';
import { UseGuards } from '@nestjs/common';
import { KeycloakGuard } from '../../security/keycloak/guards/keycloak.guard.js';

@Resolver(() => Kategorie)
@UseGuards(KeycloakGuard)
export class KategorieResolver {
    readonly #kategorieService: KategorieService;

    constructor(kategorieService: KategorieService) {
        this.#kategorieService = kategorieService;
    }

    @Mutation(() => Kategorie)
    @Roles({ roles: ['Admin', 'User'] })
    createKategorie(@Args('input') input: CreateKategorieInput) {
        return this.#kategorieService.create(input);
    }

    @Query(() => [Kategorie])
    @Roles({ roles: ['Admin', 'User'] })
    findeAlleKategorien() {
        return this.#kategorieService.findAll();
    }
}
