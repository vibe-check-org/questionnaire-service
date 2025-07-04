import { Resolver, Query, Args, ID } from '@nestjs/graphql';
import { Fragebogen } from '../model/entity/fragebogen.entity.js';
import { ReadService } from '../service/read.service.js';
import { UseGuards } from '@nestjs/common';
import { KeycloakGuard } from '../../security/keycloak/guards/keycloak.guard.js';
import { Roles } from 'nest-keycloak-connect';
import { Frage } from '../model/entity/frage.entity.js';
import { Kategorie } from '../model/entity/kategorie.entity.js';

@Resolver(() => Fragebogen)
@UseGuards(KeycloakGuard)
export class QueryResolver {
    readonly #readService: ReadService;

    constructor(readService: ReadService) {
        this.#readService = readService;
    }

    @Query(() => [Fragebogen])
    @Roles({ roles: ['ADMIN', 'BEWERBER', 'RECRUITER'] })
    async getAllFrageboegen(): Promise<Fragebogen[]> {
        return this.#readService.findAllFrageboegen();
    }

    @Query(() => Fragebogen, { nullable: true })
    @Roles({ roles: ['ADMIN', 'BEWERBER', 'RECRUITER'] })
    async getFragebogenById(
        @Args('id', { type: () => ID }) id: string,
    ): Promise<Fragebogen | null> {
        return this.#readService.findFragebogenById(id);
    }

    @Query(() => [Kategorie])
    @Roles({ roles: ['ADMIN', 'BEWERBER', 'RECRUITER'] })
    async getAllKategorien(): Promise<Kategorie[]> {
        return this.#readService.findAllKategorien();
    }

    @Query(() => Kategorie, { nullable: true })
    @Roles({ roles: ['ADMIN', 'BEWERBER', 'RECRUITER'] })
    async getKategorieById(
        @Args('id', { type: () => ID }) id: string,
    ): Promise<Kategorie | null> {
        return this.#readService.findKategorieById(id);
    }

    @Query(() => [Fragebogen])
    @Roles({ roles: ['ADMIN', 'BEWERBER', 'RECRUITER'] })
    async getFragebogenByCategory(
        @Args('kategorieId', { type: () => ID }) kategorieId: string,
    ): Promise<Fragebogen[]> {
        return this.#readService.getFragebogenByCategory(kategorieId);
    }

    @Query(() => [Frage])
    @Roles({ roles: ['ADMIN', 'BEWERBER', 'RECRUITER'] })
    async getFragenByFragebogen(
        @Args('fragebogenId', { type: () => ID }) fragebogenId: string,
    ): Promise<Frage[]> {
        return this.#readService.getFragenByFragebogen(fragebogenId);
    }

    @Query(() => [Kategorie], { nullable: true })
    @Roles({ roles: ['ADMIN', 'BEWERBER', 'RECRUITER'] })
    async getKategorienByFrageIds(
        @Args('frageIds', { type: () => [ID] }) frageId: string[],
    ): Promise<Kategorie[] | null> {
        return this.#readService.findKategorienByFrageIds(frageId);
    }

}
