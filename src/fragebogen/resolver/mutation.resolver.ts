import { Resolver, Mutation, Args, ID } from '@nestjs/graphql';
import { CreateKategorieInput } from '../model/dto/create-kategorie.input.js';
import { WriteService } from '../service/write.service.js';
import { Kategorie } from '../model/entity/kategorie.entity.js';
import { UseGuards } from '@nestjs/common';
import { KeycloakGuard } from '../../security/keycloak/guards/keycloak.guard.js';
import { CreateFragebogenInput } from '../model/dto/create-fragebogen.input.js';
import { Fragebogen } from '../model/entity/fragebogen.entity.js';
import { UpdateFragebogenInput } from '../model/dto/update-fragebogen.input.js';
import { CreateFrageInput } from '../model/dto/create-frage.input.js';
import { Frage } from '../model/entity/frage.entity.js';
import { UpdateFrageInput } from '../model/dto/update-frage.input.js';
import { UpdateKategorieInput } from '../model/dto/update-kategorie.input.js';

@Resolver(() => Kategorie)
@UseGuards(KeycloakGuard)
export class MutationResolver {
    readonly #writeService: WriteService;

    constructor(writeService: WriteService) {
        this.#writeService = writeService;
    }

    @Mutation(() => Fragebogen)
    async createFragebogen(
        @Args('input') input: CreateFragebogenInput,
    ): Promise<Fragebogen> {
        return this.#writeService.createFragebogen(input);
    }

    @Mutation(() => Fragebogen)
    async updateFragebogen(
        @Args('id', { type: () => ID }) id: string,
        @Args('input') input: UpdateFragebogenInput,
    ): Promise<Fragebogen> {
        return this.#writeService.updateFragebogen(id, input);
    }

    @Mutation(() => Boolean)
    async deleteFragebogen(
        @Args('id', { type: () => ID }) id: string,
    ): Promise<boolean> {
        return this.#writeService.deleteFragebogen(id);
    }

    @Mutation(() => Frage)
    async createFrage(@Args('input') input: CreateFrageInput): Promise<Frage> {
        return this.#writeService.createFrage(input);
    }

    @Mutation(() => Frage)
    async updateFrage(
        @Args('id', { type: () => ID }) id: string,
        @Args('input') input: UpdateFrageInput,
    ): Promise<Frage> {
        return this.#writeService.updateFrage(id, input);
    }

    @Mutation(() => Boolean)
    async deleteFrage(
        @Args('id', { type: () => ID }) id: string,
    ): Promise<boolean> {
        return this.#writeService.deleteFrage(id);
    }

    @Mutation(() => Kategorie)
    async createKategorie(
        @Args('input') input: CreateKategorieInput,
    ): Promise<Kategorie> {
        return this.#writeService.createKategorie(input);
    }

    @Mutation(() => Kategorie)
    async updateKategorie(
        @Args('id', { type: () => ID }) id: string,
        @Args('input') input: UpdateKategorieInput,
    ): Promise<Kategorie> {
        return this.#writeService.updateKategorie(id, input);
    }

    @Mutation(() => Boolean)
    async deleteKategorie(
        @Args('id', { type: () => ID }) id: string,
    ): Promise<boolean> {
        return this.#writeService.deleteKategorie(id);
    }
}
