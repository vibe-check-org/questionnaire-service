import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { Fragebogen } from '../model/entity/fragebogen.entity.js';
import { CreateFragebogenInput } from '../model/dto/create-fragebogen.input.js';
import { FragebogenService } from '../service/fragebogen.service.js';

@Resolver(() => Fragebogen)
export class FragebogenResolver {
    readonly #fragebogenService: FragebogenService;

    constructor(fragebogenService: FragebogenService) {
        this.#fragebogenService = fragebogenService;
    }
    @Mutation(() => Fragebogen)
    createFragebogen(@Args('input') input: CreateFragebogenInput) {
        return this.#fragebogenService.create(input);
    }

    @Query(() => [Fragebogen])
    findeAlleFrageboegen() {
        return this.#fragebogenService.findAll();
    }
}
