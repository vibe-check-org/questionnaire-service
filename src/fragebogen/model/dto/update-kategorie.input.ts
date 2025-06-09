import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateKategorieInput {
    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    beschreibung?: string;
}
