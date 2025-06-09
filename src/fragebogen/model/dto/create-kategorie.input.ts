import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateKategorieInput {
    @Field()
    name: string;

    @Field({ nullable: true })
    beschreibung?: string;
}
