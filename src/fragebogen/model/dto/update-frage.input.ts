import { InputType, Field, ID } from '@nestjs/graphql';
import { FrageTyp } from '../entity/frage.typ.enum.js';

@InputType()
export class UpdateFrageInput {
    @Field({ nullable: true })
    text?: string;

    @Field({ nullable: true })
    typ?: FrageTyp;

    @Field(() => ID, { nullable: true })
    kategorieId?: string;
}
