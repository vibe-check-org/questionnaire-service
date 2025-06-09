import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { Fragebogen } from '../model/entity/fragebogen.entity.js';
import { CreateFragebogenInput } from '../model/dto/create-fragebogen.input.js';
import { FragebogenService } from '../service/fragebogen.service.js';
import { UseGuards } from '@nestjs/common';
import { KeycloakGuard } from '../../security/keycloak/guards/keycloak.guard.js';
import { Roles } from 'nest-keycloak-connect';

@Resolver(() => Fragebogen)
@UseGuards(KeycloakGuard)
export class FragebogenResolver {
    readonly #fragebogenService: FragebogenService;

    constructor(fragebogenService: FragebogenService) {
        this.#fragebogenService = fragebogenService;
    }
    @Mutation(() => Fragebogen)
    @Roles({ roles: ['Admin', 'User'] })
    createFragebogen(@Args('input') input: CreateFragebogenInput) {
        return this.#fragebogenService.create(input);
    }

    @Query(() => [Fragebogen])
    @Roles({ roles: ['Admin', 'User'] })
    findeAlleFrageboegen() {
        return this.#fragebogenService.findAll();
    }
}
