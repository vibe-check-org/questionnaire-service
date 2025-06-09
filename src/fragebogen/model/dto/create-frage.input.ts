import { InputType, Field } from '@nestjs/graphql';
import { FrageTyp } from '../entity/frage.typ.enum.js';

@InputType()
export class CreateFrageInput {
    @Field()
    text: string;

    @Field()
    typ: FrageTyp;

    @Field()
    fragebogenId: string;

    @Field()
    kategorieId: string;
}
